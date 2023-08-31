"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";

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
  const [select, setSelect] = useState("popular");
  const [user, setUser] = useState<any>(null);
  const [likedByUser, setLikedByUser] = useState<any[]>([]);

  const router = useRouter();

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
  } else if (select === "popular") {
    sortedData = product.slice().sort((a, b) => b.like_count - a.like_count);
  }

  // 좋아요 눌렀을 때, 물품 및 유저에 좋아요 데이터 업데이트

  const likeHandler = async (id: string) => {
    const userId = user.id;

    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    } else {
      // 현재 유저가 해당 게시물에 대해 좋아요를 눌렀는지 안눌렀는지에 대한 데이터
      // => 빈값인경우 좋아요누르면 추가, 데이터가있을경우 좋아요누르면 삭제
      const { data: existingLikeData, error: existingLikeError } =
        await supabase
          .from("like_product")
          .select()
          .eq("product_uid", id)
          .eq("user_id", userId);

      console.log(existingLikeData);

      // 현재 아이템의 좋아요 수 객체를 가져오는 로직
      const { data: currentLikeCount } = await supabase
        .from("product")
        .select()
        .eq("id", id);

      console.log(currentLikeCount);

      // 좋아요 이미 눌렀으면 삭제하는 로직
      if (!existingLikeError && existingLikeData.length > 0) {
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
          .insert({ product_uid: id, user_id: userId });

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
      <div className="flex justify-center items-center mt-16 mb-16">
        {productCategory.map((category) => (
          <button
            key={category.value}
            onClick={() => setCategory(category.value)}
            className="flex flex-col items-center space-y-2"
          >
            <svg className="text-gray-300 bg-gray-200 w-24 h-24 m-2 rounded-full"></svg>
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
        style={{ width: "350px", float: "right" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 4C6.93913 4 5.92172 4.42143 5.17157 5.17158C4.42143 5.92172 4 6.93914 4 8C4 9.06087 4.42143 10.0783 5.17157 10.8284C5.92172 11.5786 6.93913 12 8 12C9.06087 12 10.0783 11.5786 10.8284 10.8284C11.5786 10.0783 12 9.06087 12 8C12 6.93914 11.5786 5.92172 10.8284 5.17158C10.0783 4.42143 9.06087 4 8 4ZM2 8C1.99988 7.05571 2.22264 6.12472 2.65017 5.28274C3.0777 4.44077 3.69792 3.7116 4.4604 3.15453C5.22287 2.59746 6.10606 2.22822 7.03815 2.07684C7.97023 1.92546 8.92488 1.99621 9.82446 2.28335C10.724 2.57049 11.5432 3.06591 12.2152 3.7293C12.8872 4.39269 13.3931 5.20534 13.6919 6.10114C13.9906 6.99693 14.0737 7.9506 13.9343 8.88456C13.795 9.81852 13.4372 10.7064 12.89 11.476L17.707 16.293C17.8892 16.4816 17.99 16.7342 17.9877 16.9964C17.9854 17.2586 17.8802 17.5094 17.6948 17.6948C17.5094 17.8802 17.2586 17.9854 16.9964 17.9877C16.7342 17.99 16.4816 17.8892 16.293 17.707L11.477 12.891C10.5794 13.5293 9.52335 13.9082 8.42468 13.9861C7.326 14.0641 6.22707 13.8381 5.2483 13.333C4.26953 12.8278 3.44869 12.063 2.87572 11.1224C2.30276 10.1817 1.99979 9.10144 2 8Z"
            fill="#D0D5DD"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-100"
          style={{ width: "300px", outline: "none", display: "flex" }}
          placeholder="검색어 입력"
        />
      </form>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {sortedData
          .filter(
            (item) =>
              item.name.includes(search.trim()) ||
              item.company.includes(search.trim()),
          )
          .filter((item) => item.category.includes(category))
          .map((item) => (
            <div key={item.id} className=" flex-1 min-w-0 max-w-md mb-9">
              <div className="relative">
                <img
                  src={item.img}
                  className="w-full h-auto rounded-md point"
                  alt={item.name}
                  onClick={() => router.push(`/product/${item.id}`)}
                />
                {likedByUser.find(
                  (likedItem) => likedItem.product_uid === item.id,
                ) ? (
                  <button
                    onClick={() => likeHandler(item.id)}
                    className="absolute bottom-2 right-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M16.6875 2.625C14.8041 2.625 13.1325 3.36844 12 4.64625C10.8675 3.36844 9.19594 2.625 7.3125 2.625C5.67208 2.62698 4.09942 3.27952 2.93947 4.43947C1.77952 5.59942 1.12698 7.17208 1.125 8.8125C1.125 15.5944 11.0447 21.0131 11.4666 21.2409C11.6305 21.3292 11.8138 21.3754 12 21.3754C12.1862 21.3754 12.3695 21.3292 12.5334 21.2409C12.9553 21.0131 22.875 15.5944 22.875 8.8125C22.873 7.17208 22.2205 5.59942 21.0605 4.43947C19.9006 3.27952 18.3279 2.62698 16.6875 2.625Z"
                        fill="#5FD100"
                      />
                    </svg>
                    <p className="text-[12px]" style={{ color: "#5FD100" }}>
                      {item.like_count}
                    </p>
                  </button>
                ) : (
                  <button
                    onClick={() => likeHandler(item.id)}
                    className="absolute bottom-2 right-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M16.6875 2.625C14.8041 2.625 13.1325 3.36844 12 4.64625C10.8675 3.36844 9.19594 2.625 7.3125 2.625C5.67208 2.62698 4.09942 3.27952 2.93947 4.43947C1.77952 5.59942 1.12698 7.17208 1.125 8.8125C1.125 15.5944 11.0447 21.0131 11.4666 21.2409C11.6305 21.3292 11.8138 21.3754 12 21.3754C12.1862 21.3754 12.3695 21.3292 12.5334 21.2409C12.9553 21.0131 22.875 15.5944 22.875 8.8125C22.873 7.17208 22.2205 5.59942 21.0605 4.43947C19.9006 3.27952 18.3279 2.62698 16.6875 2.625ZM16.1728 15.9713C14.8671 17.0792 13.4714 18.0764 12 18.9525C10.5286 18.0764 9.13287 17.0792 7.82719 15.9713C5.79562 14.2284 3.375 11.5706 3.375 8.8125C3.375 7.76821 3.78984 6.76669 4.52827 6.02827C5.26669 5.28984 6.26821 4.875 7.3125 4.875C8.98125 4.875 10.3781 5.75625 10.9584 7.17563C11.0429 7.38254 11.1871 7.55961 11.3726 7.68425C11.5581 7.80889 11.7765 7.87545 12 7.87545C12.2235 7.87545 12.4419 7.80889 12.6274 7.68425C12.8129 7.55961 12.9571 7.38254 13.0416 7.17563C13.6219 5.75625 15.0188 4.875 16.6875 4.875C17.7318 4.875 18.7333 5.28984 19.4717 6.02827C20.2102 6.76669 20.625 7.76821 20.625 8.8125C20.625 11.5706 18.2044 14.2284 16.1728 15.9713Z"
                        fill="#D0D5DD"
                      />
                    </svg>
                    <p className="text-[12px]" style={{ color: "#D0D5DD" }}>
                      {item.like_count}
                    </p>
                  </button>
                )}
              </div>

              <p className="text-gray-300 text-sm mt-2">{item.company}</p>
              <p className="text-sm text-gray-500">{item.name}</p>
              {item.sales ? (
                <span
                  className=" font-bold mr-2 text-[16px]"
                  style={{ color: "#5FD100" }}
                >
                  {item.sales}%
                </span>
              ) : null}
              <span className="font-bold  text-[16px]">
                {item.price.toLocaleString("ko-KR")}원
              </span>
              <button
                onClick={() => likeHandler(item.id)}
                className={`${
                  likedByUser?.length
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4`}
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
              <p>💚 {item.like_count}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductComponent;
