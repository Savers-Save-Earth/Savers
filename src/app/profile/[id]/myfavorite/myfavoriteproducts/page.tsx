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
  return (
    <>
    <div className="flex flex-wrap mx-auto">
      {userLikedProducts?.map((product) => (
          <div
            className="border-solid border-2 border-blue-900 p-5 m-3 cursor-pointer w-1/5"
            key={product.like_id}
          >
            <img className="w-1/2 rounded-full mx-auto" src={product.img} alt="No Image"/>
            <p>브랜드 : {product.product_company}</p>
            {/* window.open : 새 탭에서 해당 url로 이동 */}
            <p
            className="hover:underline"
             onClick = {() => window.open(`/product/${product.product_uid}`)}>제품 이름 : {product.product_name}</p>
            {/* <p>등록일: {post.created_date.slice(0, 10)}</p> */}
          </div>
      ))}
      
      </div>
      <button onClick={handleLoadMore}>더 보기</button>
    </>
  );
};

export default MyFavoriteProducts