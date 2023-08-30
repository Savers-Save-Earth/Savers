"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Product } from "@/types/types";
import supabase from "@/libs/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useRouter } from "next/navigation";

const ProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);

  const router = useRouter();

  const fetchProduct = async () => {
    try {
      const { data } = await supabase.from("product").select();
      setProduct(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // 좋아요 높은 순으로 정렬
  const sortedData = product
    .slice()
    .sort((a, b) => b.like_count - a.like_count);

  return (
    <div className="items-start gap-16 self-stretch">
      <h1 className="text-2xl pb-4">인기있는 친환경제품</h1>
      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          autoplay={{ delay: 2000 }}
        >
          {sortedData.map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={() => router.push(`/product/${item.id}`)}
            >
              <img src={item.img} className="rounded-lg" />
              <p className="text-gray-300 text-sm mt-2">{item.company}</p>
              <p className="text-sm text-gray-500">{item.name}</p>
              {item.sales ? (
                <span className="text-green-500 font-bold mr-2 text-[16px]">
                  {item.sales}%
                </span>
              ) : null}
              <span className="font-bold  text-[16px]">
                {item.price.toLocaleString("ko-KR")}원
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
