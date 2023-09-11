"use client";
import React from "react";
import { Product } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/api/product/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductList = () => {
  const router = useRouter();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>(["product"], getProducts);

  return (
    <div className="items-start gap-16 self-stretch">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="sm:text-2xl sm:mb-6 mb-4 font-semibold inline-block text-lg">
          인기있는 친환경제품
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          onClick={() => router.push(`/product`)}
          className="cursor-pointer mb-6 "
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.792893 15.7071C0.402369 15.3166 0.402369 14.6834 0.792893 14.2929L7.08579 8L0.792893 1.70711C0.402368 1.31658 0.402368 0.683417 0.792893 0.292893C1.18342 -0.0976315 1.81658 -0.0976315 2.20711 0.292893L9.20711 7.29289C9.59763 7.68342 9.59763 8.31658 9.20711 8.70711L2.20711 15.7071C1.81658 16.0976 1.18342 16.0976 0.792893 15.7071Z"
            fill="#D0D5DD"
          />
        </svg>
      </div>
      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          // slidesPerView={2}
          // navigation={{ prevEl: ".swiper-prev-1", nextEl: ".swiper-next-1" }}
          // navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            // 768px 미만인 경우
            0: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            // 그 외 화면 너비인 경우
            1280: {
              slidesPerView: 4, // 원래 설정 값
            },
          }}
          className="w-full"
        >
          {products
            ?.sort((a, b) => b.like_count - a.like_count)
            .map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded-lg cursor-pointer"
                  onClick={() => router.push(`/product/${item.id}`)}
                />
                <p className="text-gray-300 text-sm mt-2">{item.company}</p>
                <p
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  {item.name}
                </p>
                {item.sales ? (
                  <span
                    className="font-bold mr-2 text-sm"
                    style={{ color: "#5FD100" }}
                  >
                    {item.sales}%
                  </span>
                ) : null}
                <span className="font-bold  text-[16px]">
                  {item.price?.toLocaleString("ko-KR")}원
                </span>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="inline-block mr-0.5"
                  >
                    <path
                      d="M11.125 1.75C9.86938 1.75 8.755 2.24563 8 3.0975C7.245 2.24563 6.13062 1.75 4.875 1.75C3.78139 1.75132 2.73295 2.18635 1.95965 2.95965C1.18635 3.73295 0.751323 4.78139 0.75 5.875C0.75 10.3962 7.36312 14.0088 7.64437 14.1606C7.75367 14.2195 7.87586 14.2503 8 14.2503C8.12414 14.2503 8.24633 14.2195 8.35563 14.1606C8.63688 14.0088 15.25 10.3962 15.25 5.875C15.2487 4.78139 14.8137 3.73295 14.0404 2.95965C13.2671 2.18635 12.2186 1.75132 11.125 1.75ZM10.7819 10.6475C9.91142 11.3861 8.98091 12.0509 8 12.635C7.01909 12.0509 6.08858 11.3861 5.21812 10.6475C3.86375 9.48563 2.25 7.71375 2.25 5.875C2.25 5.17881 2.52656 4.51113 3.01884 4.01884C3.51113 3.52656 4.17881 3.25 4.875 3.25C5.9875 3.25 6.91875 3.8375 7.30562 4.78375C7.36193 4.92169 7.45805 5.03974 7.58172 5.12283C7.70539 5.20592 7.85101 5.2503 8 5.2503C8.14899 5.2503 8.29461 5.20592 8.41828 5.12283C8.54195 5.03974 8.63807 4.92169 8.69438 4.78375C9.08125 3.8375 10.0125 3.25 11.125 3.25C11.8212 3.25 12.4889 3.52656 12.9812 4.01884C13.4734 4.51113 13.75 5.17881 13.75 5.875C13.75 7.71375 12.1362 9.48563 10.7819 10.6475Z"
                      fill="#98A2B3"
                    />
                  </svg>
                  <span style={{ color: "#98A2B3" }}>{item.like_count}</span>
                </p>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
