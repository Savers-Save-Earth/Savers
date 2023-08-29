"use client";

import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState<any[]>([]);

  const fetchRestaurant = async () => {
    const { data } = await supabase.from("like_restaurant").select();

    if (data) {
      // 북마크 숫자 세는 로직
      const updatedData = data.map((item) => ({
        ...item,
        bookmarkCount: data.filter(
          (i) => i.restaurant_name === item.restaurant_name,
        ).length,
      }));

      // 북마크 숫자대로 정렬
      const sortedData = updatedData.sort(
        (a, b) => b.bookmarkCount - a.bookmarkCount,
      );

      setRestaurantList(sortedData);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <div className="p-24 items-start gap-16 self-stretch">
      <h1 className="text-2xl">인기있는 레스토랑</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {restaurantList.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-4 mt-5"
            style={{ flex: "calc(50% - 8px)", maxWidth: "50%" }}
          >
            <p>{item.restaurant_category}</p>
            <p>{item.restaurant_name}</p>
            <p>{item.restaurant_address}</p>
            <p>북마크: {item.bookmarkCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
