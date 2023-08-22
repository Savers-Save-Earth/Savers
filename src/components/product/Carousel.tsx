"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Carousel = () => {
  return (
    <div>
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
      >
        <SwiperSlide>
          <img
            src={
              "https://images.unsplash.com/photo-1588514912908-8f5891714f8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
            }
            style={{ width: "100%", height: "500px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={
              "https://images.unsplash.com/photo-1577962272294-564f38f71d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
            }
            style={{ width: "100%", height: "500px" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={
              "https://images.unsplash.com/photo-1544468266-6a8948003cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
            }
            style={{ width: "100%", height: "500px" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
