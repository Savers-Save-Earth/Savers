"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import NoBookmarkedProduct from "@/components/profile/NoBookmarkedProduct";

type UserFavoriteProducts = Database["public"]["Tables"]["like_product"]["Row"];

const MyFavoriteProducts = ({ params }: { params: { id: string } }) => {
  const [userLikedProducts, setUserLikedProducts] = useState<UserFavoriteProducts[]>([]);
  // const [userId, setUserId] = useState<string | null>(null);
  const [loadCount, setLoadCount] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  // decoded params : 유저 닉네임.
  const searchId = decodeURIComponent(params.id);

  useEffect(() => {
    fetchLikeProductData();
  }, [loadCount]);

  const fetchLikeProductData = async () => {
    try {
      let { data: likedProduct } = await supabase
        .from("like_product")
        .select("*")
        .eq("user_id", searchId);
      // .range(0, loadCount - 1);
      setUserLikedProducts(likedProduct || []);
      setIsLoading(false)
    } catch (error) {
      console.error("An error occurred:", error); // 예상치 못한 에러 처리
      return false; // 에러 처리 후 함수 종료
    }
  };

  const handleLoadMore = () => {
    setLoadCount((prev) => prev + 5);
  };
  //
  return (
<div className="space-y-4">
      {isLoading ? (
        <Loading/>
      ) : userLikedProducts.length === 0 ? (
        <NoBookmarkedProduct/>
      ) : 
    (

    <>
      <div className="flex flex-wrap items-center justify-start gap-4 self-stretch bg-white mx-auto">
        {userLikedProducts?.map((product) => (
          <div
            className="flex flex-col items-start gap-[6px] cursor-pointer h-[222px]"
            key={product.like_id}
          >
            <img
              className="w-[152px] h-[152px] rounded-2xl shrink-0"
              src={product.img || ""}
              alt="No Image"
            />
            <p className="truncate text-gray-300 text-ellipsis not-italic font-normal leading-[14px]">
              {product.product_company}
            </p>
            <p
              className="truncate text-gray-500 text-ellipsis not-italic font-normal leading-[14px]"
              onClick={() => window.open(`/product/${product.product_uid}`)}
            >
              {product!.product_name!.length > 12
                ? `${product!.product_name!.substring(0, 12)}...`
                : product.product_name}
            </p>
          </div>
        ))}

      </div>
      <button
        className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
        onClick={handleLoadMore}
      >
        더보기
      </button>
    </>

    )}
    </div>

  );
};

export default MyFavoriteProducts;
