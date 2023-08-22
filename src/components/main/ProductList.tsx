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

const ProductList = () => {
  const [product, setProduct] = useState<Product[]>([]);

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

  // 가격 낮은 순으로 정렬 (수정 예정)
  const sortedData = product.slice().sort((a, b) => a.price - b.price);

  return (
    <div>
      <h1>인기있는 친환경제품</h1>
      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          style={{ width: "1200px" }}
        >
          {sortedData.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.img} style={{ width: "300px", height: "300px" }} />
              <p>{item.company}</p>
              <p>{item.name}</p>
              {item.sales ? <p>{item.sales}%</p> : null}
              <p>{item.price.toLocaleString("ko-KR")}원</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
