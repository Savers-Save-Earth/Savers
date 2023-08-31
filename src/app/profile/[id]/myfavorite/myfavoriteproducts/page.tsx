"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type UserFavoriteProducts = Database["public"]["Tables"]["like_product"]["Row"];

const MyFavoriteProducts = ({ params }: { params: { id: string } }) => {
  const [userLikedProducts, setUserLikedProducts] = useState<UserFavoriteProducts[]>([]);
  // const [userId, setUserId] = useState<string | null>(null);
  const [loadCount, setLoadCount] = useState<number>(5);

  // decoded params : 유저 닉네임.
  const decodedParams = decodeURIComponent(params.id);

  useEffect(() => {
    fetchUserData()
  }, [loadCount]);

  const fetchUserData = async () => {
    try {
      let { data: user } = await supabase
        .from("user")
        .select("uid")
        .eq("nickname", decodedParams)
        const fetchedUserId = user![0].uid
        // setUserId(fetchedUserId)
        fetchLikeProductData(fetchedUserId)
    } catch (error) {
      console.error("An error occurred:", error); // 예상치 못한 에러 처리
      return false; // 에러 처리 후 함수 종료
    }
  }

  const fetchLikeProductData = async (fetchedUserId: string) => {
    try {
      let { data: likedProduct } = await supabase
        .from("like_product")
        .select("*")
        .eq("user_id", fetchedUserId)
        // .range(0, loadCount - 1);
        setUserLikedProducts(likedProduct || []);
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
    <>
    <div className="flex flex-wrap items-center gap-4 self-stretch bg-white mx-auto">
    {/* <div className="flex flex-col justify-between items-start self-stretch"> */}
      {userLikedProducts?.map((product) => (
          <div
            // className="border-solid border-2 border-blue-900 p-5 m-3 cursor-pointer "
            className="flex flex-col items-start gap-[6px] cursor-pointer h-[222px]"
            key={product.like_id}
          >
            <img className="w-[152px] h-[152px] rounded-2xl shrink-0" src={product.img || ""} alt="No Image"/>
            <p className="truncate text-gray-300 text-ellipsis not-italic font-normal leading-[14px]">{product.product_company}</p>
            <p
            className="truncate text-gray-500 text-ellipsis not-italic font-normal leading-[14px]"
             onClick = {() => window.open(`/product/${product.product_uid}`)}>{product.product_name}</p>
            {/* <p>등록일: {post.created_date.slice(0, 10)}</p> */}
            {/* <p className="truncate text-gray-600 text-ellipsis not-italic font-semibold">가격</p> */}
          </div>
      ))}
      
      {/* </div> */}
 
    </div>
         <button className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
         onClick={handleLoadMore}>더보기</button>
         </>
  );
};

export default MyFavoriteProducts