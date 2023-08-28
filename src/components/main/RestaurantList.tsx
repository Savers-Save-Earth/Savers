"use client";

import supabase from "@/libs/supabase";
import React, { useEffect } from "react";
import { useState } from "react";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState<any[]>([]);
  const fetchRestaurant = async () => {
    const { data } = await supabase.from("like_restaurant").select();

    if (data) {
      setRestaurantList(data);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);
  return (
    <div className="p-24 items-start gap-16 self-stretch">
      <h1 className="text-2xl">세이버 픽 레스토랑</h1>
      {Array.from(
        new Set(restaurantList.map((item) => item.restaurant_name)),
      ).map((name) => {
        const uniqueRestaurant = restaurantList.find(
          (item) => item.restaurant_name === name,
        );
        return (
          <div
            key={uniqueRestaurant.id}
            className="rounded-lg border border-gray-200 bg-white p-4 mt-5"
          >
            <p>{uniqueRestaurant.restaurant_category}</p>
            <p>{uniqueRestaurant.restaurant_name}</p>
            <p>{uniqueRestaurant.restaurant_address}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantList;
