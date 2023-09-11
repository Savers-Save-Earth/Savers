"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import { ToastInfo } from "@/libs/toastifyAlert";
import { useAuth } from "@/hooks/useAuth";
import {
  createLikeProduct,
  cancelLikeProduct,
  plusLikeCount,
  minusLikeCount,
} from "@/api/product/like";
import { getProductLikeStatus } from "@/api/product/like";
import { ProductLikesType } from "@/types/types";
import { getProducts } from "@/api/product/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getThisProductLikeStatus } from "@/api/product/like";
import { useIsMobile } from "@/hooks/useIsMobile";

const productCategory = [
  { value: "", label: "전체", img: "assets/product/all.png" },
  { value: "bath", label: "욕실", img: "assets/product/bath.png" },
  { value: "kitchen", label: "주방", img: "assets/product/kitchen.png" },
  { value: "food", label: "식품", img: "assets/product/food.png" },
  { value: "else", label: "기타", img: "assets/product/else.png" },
];

const selectOptions = [
  { value: "newest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "cheap", label: "가격 낮은 순" },
  { value: "expensive", label: "가격 높은 순" },
  { value: "sales", label: "할인순" },
];

const ProductComponent = () => {
  const [buttonStates, setButtonStates] = useState({});
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("sales");
  const [likedByUser, setLikedByUser] = useState<ProductLikesType[]>([]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const cancelProductLikeMutation = useMutation(cancelLikeProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLikeProduct"] });
    },
  });

  const likeProductMutation = useMutation(createLikeProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLikeProduct"] });
    },
  });

  const plusProductLikeMutation = useMutation(plusLikeCount, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  const minusProductLikeMutation = useMutation(minusLikeCount, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  // 현재 유저정보 가져오기
  const currentUser = useAuth();

  // 현재 제품 가져오기
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>(["product"], getProducts);

  // 현재 유저의 좋아요상태 가져오기
  const { data: likeStatus } = useQuery<ProductLikesType[]>(
    ["userLikeProduct"],
    () => getProductLikeStatus(currentUser!.uid),
  );

  // 유저의 기존 좋아요 목록을 불러오기
  const getProductLikedStatus = async () => {
    if (currentUser) {
      try {
        const likeStatus = await getProductLikeStatus(currentUser.uid);
        setLikedByUser(likeStatus);
      } catch (error) {}
    }
  };

  useEffect(() => {
    getProductLikedStatus();
  }, [currentUser]);

  const handleProductLikeClick = async (
    productId: string,
    name: string,
    img: string,
    company: string,
    currentLikeCount: number,
  ) => {
    if (!currentUser) {
      ToastInfo("로그인이 필요한 서비스 입니다.");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return false;
    } else {
      const currentTime = Date.now();

      // if (
      //   !buttonStates[productId] ||
      //   currentTime - buttonStates[productId] >= 1000
      // ) {
      //   // 버튼 상태가 없거나 마지막 클릭이 1초 이상 지난 경우
      //   setButtonStates({
      //     ...buttonStates,
      //     [productId]: currentTime, // 버튼의 마지막 클릭 시간 업데이트
      //   });
      // }

      const likeStatus = await getThisProductLikeStatus(
        productId,
        currentUser.uid,
      );

      if (likeStatus.length > 0) {
        // 이미 좋아요를 누른 경우 북마크 취소
        const cancelLike = {
          product_uid: productId,
          user_id: currentUser.uid,
          product_name: name,
          img: img,
          product_company: company,
        };

        const minusLike = {
          like_count: currentLikeCount,
          id: productId,
        };

        setLikedByUser((prevLikedByUser) =>
          prevLikedByUser.filter((item) => item.product_uid !== productId),
        );

        minusProductLikeMutation.mutate(minusLike);
        cancelProductLikeMutation.mutate(cancelLike);
      } else {
        // 좋아요를 누르지 않은 경우 북마크 추가
        const newLike = {
          product_uid: productId,
          user_id: currentUser.uid,
          product_name: name,
          img: img,
          product_company: company,
        };

        const plusLike = {
          like_count: currentLikeCount,
          id: productId,
        };

        // 좋아요 상태를 먼저 업데이트하고 UI에 반영
        setLikedByUser((prevLikedByUser) => [...prevLikedByUser, newLike]);

        plusProductLikeMutation.mutate(plusLike);
        likeProductMutation.mutate(newLike);
      }
    }
  };

  // 셀렉트 내용으로 정렬
  let sortedData: Product[] = products?.slice() || [];

  if (select === "expensive") {
    sortedData = sortedData.slice().sort((a, b) => b.price - a.price);
  } else if (select === "cheap") {
    sortedData = sortedData.slice().sort((a, b) => a.price - b.price);
  } else if (select === "sales") {
    sortedData = sortedData.slice().sort((a, b) => b.sales - a.sales);
  } else if (select === "newest") {
    sortedData = sortedData.slice().sort((a, b) => b.createdAt - a.createdAt);
  } else if (select === "popular") {
    sortedData = sortedData.slice().sort((a, b) => b.like_count - a.like_count);
  }

  return (
    <>
      {/* 카테고리 선택 로직 */}
      <div className="flex justify-center items-center mt-16 mb-16">
        {productCategory.map((category) => (
          <button
            key={category.value}
            onClick={() => setCategory(category.value)}
            className="flex flex-col items-center space-y-2 xl:m-4 m-2 focus:text-[#5FD100]"
          >
            <img src={category.img} className="xl:w-[96px] w-[76px] " />
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

      <form className="sm:w-[350px] w-[220px] float-right rounded-lg flex p-2 items-center gap-2 bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4C6.93913 4 5.92172 4.42143 5.17157 5.17158C4.42143 5.92172 4 6.93914 4 8C4 9.06087 4.42143 10.0783 5.17157 10.8284C5.92172 11.5786 6.93913 12 8 12C9.06087 12 10.0783 11.5786 10.8284 10.8284C11.5786 10.0783 12 9.06087 12 8C12 6.93914 11.5786 5.92172 10.8284 5.17158C10.0783 4.42143 9.06087 4 8 4ZM2 8C1.99988 7.05571 2.22264 6.12472 2.65017 5.28274C3.0777 4.44077 3.69792 3.7116 4.4604 3.15453C5.22287 2.59746 6.10606 2.22822 7.03815 2.07684C7.97023 1.92546 8.92488 1.99621 9.82446 2.28335C10.724 2.57049 11.5432 3.06591 12.2152 3.7293C12.8872 4.39269 13.3931 5.20534 13.6919 6.10114C13.9906 6.99693 14.0737 7.9506 13.9343 8.88456C13.795 9.81852 13.4372 10.7064 12.89 11.476L17.707 16.293C17.8892 16.4816 17.99 16.7342 17.9877 16.9964C17.9854 17.2586 17.8802 17.5094 17.6948 17.6948C17.5094 17.8802 17.2586 17.9854 16.9964 17.9877C16.7342 17.99 16.4816 17.8892 16.293 17.707L11.477 12.891C10.5794 13.5293 9.52335 13.9082 8.42468 13.9861C7.326 14.0641 6.22707 13.8381 5.2483 13.333C4.26953 12.8278 3.44869 12.063 2.87572 11.1224C2.30276 10.1817 1.99979 9.10144 2 8Z"
            fill="#D0D5DD"
          />
        </svg>
        {!useIsMobile ? (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" bg-gray-100 w-[300px] outline-none flex"
            placeholder="제품명 또는 회사명을 입력해주세요."
          />
        ) : (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" bg-gray-100 w-[200px] outline-none flex"
            placeholder="제품명 또는 회사명 입력"
          />
        )}
      </form>
      <div className="mt-8 grid xl:grid-cols-4  xl:gap-4 md:grid-cols-3 md:gap-3 grid-cols-2 gap-2 mb-8">
        {sortedData.filter(
          (item) =>
            item.name.includes(search.trim()) ||
            item.company.includes(search.trim()),
        ).length > 0 ? (
          sortedData
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
                    className="w-full h-auto rounded-md point cursor-pointer"
                    alt={item.name}
                    onClick={() => router.push(`/product/${item.id}`)}
                  />
                  {likedByUser?.find(
                    (likedItem) => likedItem.product_uid === item.id,
                  ) ? (
                    <button
                      onClick={() =>
                        handleProductLikeClick(
                          item.id,
                          item.name,
                          item.img,
                          item.company,
                          item.like_count,
                        )
                      }
                      // disabled={
                      //   // buttonStates[item.id] &&
                      //   // Date.now() - buttonStates[item.id] < 1000
                      // }
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
                      onClick={() =>
                        handleProductLikeClick(
                          item.id,
                          item.name,
                          item.img,
                          item.company,
                          item.like_count,
                        )
                      }
                      // disabled={
                      //   // buttonStates[item.id] &&
                      //   // Date.now() - buttonStates[item.id] < 1000
                      // }
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
                          d="M16.6875 2.625C14.8041 2.625 13.1325 3.36844 12 4.64625C10.8675 3.36844 9.19594 2.625 7.3125 2.625C5.67208 2.62698 4.09942 3.27952 2.93947 4.43947C1.77952 5.59942 1.12698 7.17208 1.125 8.8125C1.125 15.5944 11.0447 21.0131 11.4666 21.2409C11.6305 21.3292 11.8138 21.3754 12 21.3754C12.1862 21.3754 12.3695 21.3292 12.5334 21.2409C12.9553 21.0131 22.875 15.5944 22.875 8.8125C22.873 7.17208 22.2205 5.59942 21.0605 4.43947C19.9006 3.27952 18.3279 2.62698 16.6875 2.625ZM16.1728 15.9713C14.8671 17.0792 13.4714 18.0764 12 18.9525C10.5286 18.0764 9.13287 17.0792 7.82719 15.9713C5.79562 14.2284 3.375 11.5706 3.375 8.8125C3.375 7.76821 3.78984 6.76669 4.52827 6.02827C5.26669 5.28984 6.26821 4.875 7.3125 4.875C8.98125 4.875 10.3781 5.75625 10.9584 7.17562C11.0429 7.38254 11.1871 7.55961 11.3726 7.68425C11.5581 7.80889 11.7765 7.87545 12 7.87545C12.2235 7.87545 12.4419 7.80889 12.6274 7.68425C12.8129 7.55961 12.9571 7.38254 13.0416 7.17562C13.6219 5.75625 15.0188 4.875 16.6875 4.875C17.7318 4.875 18.7333 5.28984 19.4717 6.02827C20.2102 6.76669 20.625 7.76821 20.625 8.8125C20.625 11.5706 18.2044 14.2284 16.1728 15.9713Z"
                          fill="white"
                        />
                      </svg>
                      <p className="text-[12px]" style={{ color: "#D0D5DD" }}>
                        {item.like_count}
                      </p>
                    </button>
                  )}
                </div>

                <p className="text-gray-300 text-sm mt-2">{item.company}</p>
                <p
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  {item.name}
                </p>
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
              </div>
            ))
        ) : (
          <div className="col-span-4 mx-auto">
            <div className="h-[500px]">
              <h1 className="pt-48 text-gray-900 text-xl">
                &quot;{search}&quot; 검색 결과가 존재하지 않습니다.
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductComponent;
