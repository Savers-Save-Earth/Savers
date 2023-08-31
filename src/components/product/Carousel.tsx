"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const bannerList = [
  { img: "/assets/product/banner1.png" },
  { img: "/assets/product/banner2.png" },
  { img: "/assets/product/banner3.png" },
  { img: "/assets/product/banner4.png" },
  { img: "/assets/product/banner5.png" },
];

const Carousel = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        autoplay={{ delay: 2000 }}
        className="rounded-2xl"
      >
        {bannerList.map((item) => (
          <SwiperSlide>
            <img src={item.img} style={{ height: "280px" }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
