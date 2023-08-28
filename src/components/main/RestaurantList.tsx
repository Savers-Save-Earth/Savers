"use client";

import supabase from "@/libs/supabase";
import React, { useEffect } from "react";
import { useState } from "react";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState<any[]>([]);
  const fetchRestaurant = async () => {
    const { data } = await supabase.from("like_restaurant").select();

    setRestaurantList(data);
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);
  return (
    <div className="p-24 items-start gap-16 self-stretch">
      <h1 className="text-2xl">세이버 픽 레스토랑</h1>
      {restaurantList.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-gray-200 bg-white p-4 mt-5"
        >
          <p>{item.restaurant_category}</p>
          <p>{item.restaurant_name}</p>
          <p>{item.restaurant_address}</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
