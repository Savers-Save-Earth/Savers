"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useIsMobileMd } from "@/hooks/useIsMobileMd";

const bannerList = [
  { id: 1, img: "/assets/product/banner_5.png" },
  { id: 2, img: "/assets/product/banner_4.png" },
  { id: 3, img: "/assets/product/banner_3.png" },
  { id: 4, img: "/assets/product/banner_2.png" },
  { id: 5, img: "/assets/product/banner_1.png" },
];

const MbannerList = [
  { id: 1, img: "/assets/product/Mbanner_5.png" },
  { id: 2, img: "/assets/product/Mbanner_4.png" },
  { id: 3, img: "/assets/product/Mbanner_3.png" },
  { id: 4, img: "/assets/product/Mbanner_2.png" },
  { id: 5, img: "/assets/product/Mbanner_1.png" },
];

const Carousel = () => {
  const isMobileMd = useIsMobileMd();
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {!isMobileMd ? (
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          className="rounded-2xl"
        >
          {bannerList.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.img} style={{}} alt="banner image" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          className="rounded-2xl"
        >
          {MbannerList.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.img} style={{}} alt="banner image" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
