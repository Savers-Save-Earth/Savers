"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useIsTablet } from "@/hooks/useIsTablet";
import Link from "next/link";
import Image from "next/image";
import { useIsLaptop } from "@/hooks/useIsLaptop";

const bannerList = [
  {
    id: 1,
    img: "/assets/product/banner_5.png",
    title: "널담쿠키",
    link: "/product/6163c5d6-95e1-4cc9-a5e4-c17a3c626437",
  },
  {
    id: 2,
    img: "/assets/product/banner_4.png",
    title: "고체치약",
    link: "/product/8d134706-c7d9-4b98-a359-e2ce1e98224f",
  },
  {
    id: 3,
    img: "/assets/product/banner_3.png",
    title: "선크림",
    link: "/product/e011a812-d3b6-4fcc-addc-c05a4810cad6",
  },
  {
    id: 4,
    img: "/assets/product/banner_2.png",
    title: "수세미",
    link: "/product/2f45314a-da9e-4a81-9435-06c1f5992b41",
  },
  {
    id: 5,
    img: "/assets/product/banner_1.png",
    title: "요가매트",
    link: "/product/6df513c3-152f-4469-a55b-6fe96762ff69",
  },
];

const MbannerList = [
  {
    id: 1,
    img: "/assets/product/Mbanner_5.png",
    title: "널담쿠키",
    link: "/product/6163c5d6-95e1-4cc9-a5e4-c17a3c626437",
  },
  {
    id: 2,
    img: "/assets/product/Mbanner_4.png",
    title: "고체치약",
    link: "/product/8d134706-c7d9-4b98-a359-e2ce1e98224f",
  },
  {
    id: 3,
    img: "/assets/product/Mbanner_3.png",
    title: "선크림",
    link: "/product/e011a812-d3b6-4fcc-addc-c05a4810cad6",
  },
  {
    id: 4,
    img: "/assets/product/Mbanner_2.png",
    title: "수세미",
    link: "/product/2f45314a-da9e-4a81-9435-06c1f5992b41",
  },
  {
    id: 5,
    img: "/assets/product/Mbanner_1.png",
    title: "요가매트",
    link: "/product/6df513c3-152f-4469-a55b-6fe96762ff69",
  },
];

const Carousel = () => {
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();
  return (
    <>
      {!isLaptop && (
        <h1 className="text-2xl pb-16 text-gray-900  font-semibold">
          친환경제품 구매
        </h1>
      )}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {!isTablet ? (
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
                  <Image
                    src={item.img}
                    width={1416}
                    height={354}
                    quality={100}
                    alt={item.title}
                  />
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
                  <Image
                    src={item.img}
                    width={740}
                    height={650}
                    quality={100}
                    alt={item.title}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default Carousel;
