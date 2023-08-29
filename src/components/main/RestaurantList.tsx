"use client";

import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

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
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        // navigation={{ prevEl: ".swiper-prev-1", nextEl: ".swiper-next-1" }}
        autoplay={{ delay: 2000 }}
        style={{ width: "100%" }}
      >
        {restaurantList
          .filter(
            (item, index, self) =>
              self.findIndex(
                (i) => i.restaurant_name === item.restaurant_name,
              ) === index,
          )
          .map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center"
              style={{ height: "50%", width: "50%" }}
            >
              <div className="rounded-lg border border-gray-200 bg-white p-4">
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
                  <p className="text-gray-500 text-xs">
                    {item.restaurant_category}
                  </p>
                  <p className="font-bold">
                    {item.restaurant_name.length > 13
                      ? `${item.restaurant_name.slice(0, 10) + `...`}`
                      : item.restaurant_name}
                  </p>
                  <span className="text-sm">{item.restaurant_address}</span>
                  <span className="text-sm ml-2">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      size="xs"
                      style={{ color: "#000000", marginRight: "5px" }}
                    />
                    {item.bookmarkCount}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default RestaurantList;
