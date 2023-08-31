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
  <div className="flex flex-wrap justify-between self-stretch bg-white mx-auto w-full gap-2">
    {userLikedRestaurants?.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-center w-[49%] h-1/2"
      >
        <div className="w-full p-4 border border-gray-200 rounded-lg bg-white flex items-center">
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "lightgray",
              display: "inline-block",
              marginRight: "10px",
            }}
          ></div>
          <div style={{ display: "inline-block" }}>
            <p className="font-bold text-[16px]">
              {item.restaurant_name.length > 13
                ? `${item.restaurant_name.slice(0, 10) + `...`}`
                : item.restaurant_name}
            </p>
            <span className="text-sm text-gray-400">
              {item.restaurant_address}
            </span>
            <p className="text-sm">
              <img
                src="/assets/like.png"
                className="inline-block mr-0.5"
                style={{ height: "auto", verticalAlign: "middle" }}
                alt="Icon"
              />
              <span className="text-gray-300">{item.bookmarkCount}</span>
            </p>
            <p>
              <img
                src="/assets/share.png"
                className="border border-gray-300 p-2 rounded-full inline-block cursor-pointer"
                // onClick={shareHandler}
              />
              <span
                className="bg-gray-50 ml-2 text-[14px] text-gray-500 rounded-2xl cursor-pointer"
                style={{ padding: "8px 10px" }}
                onClick={() => window.open(`${item?.restaurant_map}`)}
              >
                상세보기
              </span>
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
  <button onClick={handleLoadMore}>더 보기</button>
</>

  );
};

export default MyFavoriteRestaurants