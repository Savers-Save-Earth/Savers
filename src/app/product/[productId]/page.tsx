"use client";
import React, { useEffect } from "react";
import supabase from "@/libs/supabase";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ProductPost = () => {
  const [product, setProduct] = useState<Product>();
  const [likedByUser, setLikedByUser] = useState<any>();
  const [user, setUser] = useState<any>(null);
  const params = useParams();

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("product")
      .select()
      .eq("id", params.productId);

    setProduct(data![0]);
  };

  // 현재 유저정보 fetch
  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(false);
      } else {
        setUser(user);
        fetchUserLike(user); // 유저 정보를 가져온 후에 fetchUserLike 함수 호출
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // 유저의 기존에 있던 좋아요를 불러오는 로직 -> 로그인 이후에 실행되는 함수
  const fetchUserLike = async (user: any) => {
    const { data: existingLikeData, error: existingLikeError } = await supabase
      .from("like_product")
      .select()
      .eq("product_uid", params.productId)
      .eq("user_id", user.id);

    setLikedByUser(existingLikeData!);
    console.log(existingLikeData);
  };

  // 좋아요 눌렀을 때, 물품 및 유저에 좋아요 데이터 업데이트

  const likeHandler = async () => {
    const userId = user.id;

    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    } else {
      // 현재 유저가 해당 게시물에 대해 좋아요를 눌렀는지 안눌렀는지에 대한 데이터
      // => 빈값인경우 좋아요누르면 추가, 데이터가있을경우 좋아요누르면 삭제
      const { data: existingLikeData, error: existingLikeError } =
        await supabase
          .from("like_product")
          .select()
          .eq("product_uid", params.productId)
          .eq("user_id", userId);

      console.log(existingLikeData);

      // 현재 아이템의 좋아요 수 객체를 가져오는 로직
      const { data: currentLikeCount } = await supabase
        .from("product")
        .select()
        .eq("id", params.productId);

      console.log(currentLikeCount);

      // 좋아요 이미 눌렀으면 삭제하는 로직
      if (!existingLikeError && existingLikeData.length > 0) {
        await supabase
          .from("like_product")
          .delete()
          .eq("user_id", userId)
          .eq("product_uid", params.productId);

        // 좋아요 count 내리는 로직
        const { error: likeCountError } = await supabase
          .from("product")
          .update({ like_count: currentLikeCount![0].like_count - 1 })
          .eq("id", params.productId);
      } else {
        // 좋아요 구현하는 로직
        const { error: insertError } = await supabase
          .from("like_product")
          .insert({ product_uid: params.productId, user_id: userId });

        // 좋아요 count 올리는 로직
        const { error: likeCountError } = await supabase
          .from("product")
          .update({ like_count: currentLikeCount![0].like_count + 1 })
          .eq("id", params.productId);
      }
      fetchProduct(); // 데이터 갱신 [숫자]
      fetchUser(); // 데이터 갱신 [좋아요]
    }
  };

  // 공유하기 눌렀을 때
  const shareHandler = async () => {
    const userId = user.id;
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      alert("링크가 복사되었습니다.");
    });
    // 제품 공유하기 눌렀을 때 얻는 배지
    if (user) {
      const { error: addShageBadgeError } = await supabase
        .from("badge")
        .insert({ badge_title: "share", user_id: userId });
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchUser();
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
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
            className="rounded-2xl lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center"
          >
            <SwiperSlide>
              <img src={product?.img} className="w-full lg:h-auto" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={product?.sub_img} className="w-full lg:h-auto" />
            </SwiperSlide>
          </Swiper>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.company}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 ml-3">
                  💚 {product?.like_count} 명이 이 제품을 좋아합니다
                </span>
              </span>
              <span
                className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s cursor-pointer"
                onClick={shareHandler}
              >
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{product?.context}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center">
                <div className="relative">
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"></span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-green-500 mr-2">
                {product?.sales ? `${product?.sales + "%"}` : null}
              </span>
              <span className="title-font font-medium text-2xl text-gray-900">
                {product?.price.toLocaleString("ko-KR") + "원"}
              </span>

              <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                <a href={product?.website}>구매하기</a>
              </button>
              <button
                onClick={likeHandler}
                className={`${
                  likedByUser?.length
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4`}
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPost;
