"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Product } from "@/types/types";

const productCategory = [
  { value: "", label: "전체" },
  { value: "bath", label: "욕실" },
  { value: "kitchen", label: "주방" },
  { value: "food", label: "식품" },
  { value: "else", label: "기타" },
];

const selectOptions = [
  { value: "newest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "cheap", label: "가격 낮은 순" },
  { value: "expensive", label: "가격 높은 순" },
  { value: "sales", label: "할인순" },
];

const ProductComponent = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("cheap");
  const [user, setUser] = useState<any>(null);
  const [likedByUser, setLikedByUser] = useState<any[]>([]);

  // 물품 리스트 fetch
  const fetchProduct = async () => {
    try {
      const { data } = await supabase.from("product").select();
      setProduct(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 현재 유저정보 fetch
  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(false);
      } else {
        setUser(user);
        console.log(user);
        fetchUserLike(user); // 유저 정보를 가져온 후에 fetchUserLike 함수 호출
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // 유저의 기존에 있던 좋아요 목록을 불러오는 로직 -> 로그인 이후에 실행되는 함수
  const fetchUserLike = async (user: any) => {
    const { data: existingLikeData, error: existingLikeError } = await supabase
      .from("like_product")
      .select()
      .eq("user_id", user.id);
    setLikedByUser(existingLikeData!);
    console.log(existingLikeData);
  };

  useEffect(() => {
    fetchProduct();
    fetchUser();
  }, []);

  // 셀렉트 내용으로 정렬
  let sortedData = product.slice(); // 초기화

  if (select === "expensive") {
    sortedData = product.slice().sort((a, b) => b.price - a.price);
  } else if (select === "cheap") {
    sortedData = product.slice().sort((a, b) => a.price - b.price);
  } else if (select === "sales") {
    sortedData = product.slice().sort((a, b) => b.sales - a.sales);
  } else if (select === "newest") {
    sortedData = product.slice().sort((a, b) => b.createdAt - a.createdAt);
  }

  // 좋아요 눌렀을 때, 물품 및 유저에 좋아요 데이터 업데이트

  const likeHandler = async (id: string) => {
    const userId = user.id;

    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    } else {
      const isLiked = likedByUser.some(
        (likedItem) => likedItem.product_uid === id,
      );

      const { data: existingLikeData, error: existingLikeError } =
        await supabase
          .from("like_product")
          .select()
          .eq("product_uid", id)
          .eq("user_id", userId);

      const { data: existingLikeListData, error: existingLikeListError } =
        await supabase.from("like_product").select().eq("user_id", userId);

      const { data: currentLikeCount } = await supabase
        .from("product")
        .select()
        .eq("id", id);

      // 좋아요 이미 눌렀으면 삭제하는 로직
      if (!existingLikeError && existingLikeData!.length > 0) {
        await supabase
          .from("like_product")
          .delete()
          .eq("user_id", userId)
          .eq("product_uid", id);

        // 좋아요 count 내리는 로직
        const { error: likeCountError } = await supabase
          .from("product")
          .update({ like_count: currentLikeCount![0].like_count - 1 })
          .eq("id", id);
      } else {
        // 좋아요 구현하는 로직
        const { error: insertError } = await supabase
          .from("like_product")
          .insert([{ product_uid: id, user_id: userId }]);

        // 좋아요 count 올리는 로직
        const { error: likeCountError } = await supabase
          .from("product")
          .update({ like_count: currentLikeCount![0].like_count + 1 })
          .eq("id", id);
      }
      fetchProduct(); // 데이터 갱신 [숫자]
      fetchUser(); // 데이터 갱신 [좋아요]
    }
  };

  return (
    <>
      {/* 카테고리 선택 로직 */}
      <div className="flex justify-center items-center mt-10">
        {productCategory.map((category) => (
          <button
            key={category.value}
            onClick={() => setCategory(category.value)}
            className="flex flex-col items-center space-y-2"
          >
            <svg className="text-gray-300 bg-gray-400 w-40 m-2"></svg>
            <p>{category.label}</p>
          </button>
        ))}
      </div>
      {/* 셀렉트바 선택 로직  */}
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <form
        className="rounded-lg flex p-2 items-center gap-2 bg-gray-100"
        style={{ width: "350px", float: "right", marginRight: "22px" }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-100"
          style={{ width: "300px", outline: "none" }}
          placeholder="검색어를 입력하세요."
        />
      </form>
      <div className="mt-5 ">
        {sortedData
          // 검색어 필터 및 카테고리 필터
          .filter(
            (item) =>
              item.name.includes(search.trim()) ||
              item.company.includes(search.trim()),
          )
          .filter((item) => item.category.includes(category))
          .map((item) => (
            <div key={item.id} className="inline-table m-3">
              <img
                src={item.img}
                style={{
                  height: "406px",
                  width: "406px",
                  borderRadius: "16px",
                }}
              />
              <p className="text-gray-500">{item.company}</p>
              <p>{item.name}</p>
              <p>{item.context}</p>
              <p>
                <a href={item.website}>상세보기</a>
              </p>
              {item.sales ? (
                <span className="text-green-500 font-bold mr-2">
                  {item.sales}%
                </span>
              ) : null}
              <span className="font-bold">
                {item.price.toLocaleString("ko-KR")}원
              </span>
              <button
                onClick={() => likeHandler(item.id)}
                className={`${
                  likedByUser.some(
                    (likedItem) => likedItem.product_uid === item.id,
                  )
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } px-3 py-1 rounded-full transition-colors duration-300`}
              >
                🤍
              </button>
              <p>{item.like_count}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductComponent;
