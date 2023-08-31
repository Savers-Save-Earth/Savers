"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type UserFavoriteRestaurant = Database["public"]["Tables"]["like_restaurant"]["Row"];

const MyFavoriteRestaurants = ({ params }: { params: { id: string } }) => {
  const [userLikedRestaurants, setUserLikedRestaurants] = useState<any[]>([]);
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
      let { data: likedRestaurant } = await supabase
        .from("like_restaurant")
        .select("*")
        .eq("user_id", fetchedUserId)
        // .range(0, loadCount - 1);
        setUserLikedRestaurants(likedRestaurant || []);
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
    <p>식당 좋아요가 추가되면 여기에 추가하도록 할게요!!! 지금은 북마크한 제품 데이터입니다!!!</p>
      {userLikedRestaurants?.map((restaurants) => (
          <div
            className="border-solid border-2 border-blue-900 p-5 m-5 cursor-pointer"
            key={restaurants.id}
          >
            {/* <img className="w-1/6 rounded-full" src={product.img} alt="No Image"/> */}
            <img/>
            <p>레스토랑 이름 : {restaurants.restaurant_name}</p>
            <p>레스토랑 업종 : {restaurants.restaurant_category}</p>
            {/* window.open : 새 탭에서 해당 url로 이동 */}
            {/* <p onClick = {() => window.open(`/product/${product.product_uid}`)}>제품 uid : {product.product_uid}</p> */}
            {/* <p>등록일: {post.created_date.slice(0, 10)}</p> */}
          </div>
      ))}
      <button onClick={handleLoadMore}>더 보기</button>
      <div>MyFavoriteRestaurants</div>
      <div>MyFavoriteRestaurants</div>
      <div>MyFavoriteRestaurants</div>
      <div>MyFavoriteRestaurants</div>
      <div>MyFavoriteRestaurants</div>
      <div>MyFavoriteRestaurants</div>
      <div>MyFavoriteRestaurants</div>
    </>
  );
};

export default MyFavoriteRestaurants