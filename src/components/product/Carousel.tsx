"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useIsMobileMd } from "@/hooks/useIsMobileMd";
import Link from "next/link";

const bannerList = [
  {
    id: 1,
    img: "/assets/product/banner_5.png",
    link: "/product/6163c5d6-95e1-4cc9-a5e4-c17a3c626437",
  },
  {
    id: 2,
    img: "/assets/product/banner_4.png",
    link: "/product/8d134706-c7d9-4b98-a359-e2ce1e98224f",
  },
  {
    id: 3,
    img: "/assets/product/banner_3.png",
    link: "/product/e011a812-d3b6-4fcc-addc-c05a4810cad6",
  },
  {
    id: 4,
    img: "/assets/product/banner_2.png",
    link: "/product/2f45314a-da9e-4a81-9435-06c1f5992b41",
  },
  {
    id: 5,
    img: "/assets/product/banner_1.png",
    link: "/product/6df513c3-152f-4469-a55b-6fe96762ff69",
  },
];

const MbannerList = [
  {
    id: 1,
    img: "/assets/product/Mbanner_5.png",
    link: "/product/6163c5d6-95e1-4cc9-a5e4-c17a3c626437",
  },
  {
    id: 2,
    img: "/assets/product/Mbanner_4.png",
    link: "/product/8d134706-c7d9-4b98-a359-e2ce1e98224f",
  },
  {
    id: 3,
    img: "/assets/product/Mbanner_3.png",
    link: "/product/e011a812-d3b6-4fcc-addc-c05a4810cad6",
  },
  {
    id: 4,
    img: "/assets/product/Mbanner_2.png",
    link: "/product/2f45314a-da9e-4a81-9435-06c1f5992b41",
  },
  {
    id: 5,
    img: "/assets/product/Mbanner_1.png",
    link: "/product/6df513c3-152f-4469-a55b-6fe96762ff69",
  },
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
              <Link href={item.link}>
                <img src={item.img} alt="banner image" />
              </Link>
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
              <Link href={item.link}>
                <img src={item.img} alt="banner image" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
