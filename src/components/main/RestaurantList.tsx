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

  // 공유하기 눌렀을 때
  const shareHandler = async () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      alert("링크가 복사되었습니다.");
    });
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <div className="items-start gap-16 self-stretch mt-16">
      <h1 className="text-2xl mb-6">인기있는 비건식당</h1>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
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
              <div className="rounded-lg border border-gray-200 bg-white p-4 flex items-center">
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
                      onClick={shareHandler}
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
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default RestaurantList;
