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
import {
  getMissionHandler,
  likeShareMissionHandler,
  updateMissionHandler,
} from "@/api/mission/checkMission";
import { convertDate } from "@/libs/util";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastInfo, ToastSuccess } from "@/libs/toastifyAlert";

const Detail = () => {
  const [product, setProduct] = useState<Product>();
  const [likedByUser, setLikedByUser] = useState<any>();
  const [user, setUser] = useState<any>(null);
  const params = useParams();

  const [missionUid, setMissionUid] = useState<any>("");
  const currentDate = convertDate(new Date());

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
      // console.error("Error fetching user:", error);
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
    // console.log(existingLikeData);
  };

  // 좋아요 눌렀을 때, 물품 및 유저에 좋아요 데이터 업데이트

  const likeHandler = async () => {
    const userId = user.id;

    if (!user) {
      ToastInfo("로그인이 필요한 서비스 입니다.");
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

      // console.log(existingLikeData);

      // 현재 아이템의 좋아요 수 객체를 가져오는 로직
      const { data: currentLikeCount } = await supabase
        .from("product")
        .select()
        .eq("id", params.productId);

      // console.log(currentLikeCount);

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
          .insert({
            product_uid: params.productId,
            user_id: userId,
            img: product?.img,
            product_name: product?.name,
            product_company: product?.company,
          });

        // 좋아요 count 올리는 로직
        const { error: likeCountError } = await supabase
          .from("product")
          .update({ like_count: currentLikeCount![0].like_count + 1 })
          .eq("id", params.productId);

        // 좋아요 badge 추가하는 로직

        const { error: badgeDataError } = await supabase
          .from("badge")
          .insert({ user_id: userId, badge_title: "like" });

        ///===================👇동준작업👇=========================================================
        likeShareMissionHandler(
          user,
          currentDate,
          "제품",
          setMissionUid,
          "좋아요",
        );
        ///===================👆동준작업👆=========================================================
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
      ToastSuccess("링크가 복사되었습니다.");
    });
    // 제품 공유하기 눌렀을 때 얻는 배지
    if (user) {
      const { error: addShageBadgeError } = await supabase
        .from("badge")
        .insert({ badge_title: "share", user_id: userId });

      ///===================👇동준작업👇=========================================================
      likeShareMissionHandler(
        user,
        currentDate,
        "제품",
        setMissionUid,
        "공유하기",
      );
      ///===================👆동준작업👆=========================================================
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
            autoplay={{ delay: 2000 }}
            className="rounded-2xl lg:w-1/2 w-full xl:h-auto object-cover object-center"
          >
            <SwiperSlide>
              <img src={product?.img} className="w-full h-auto" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={product?.sub_img} className="w-ful h-full" />
            </SwiperSlide>
          </Swiper>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ml-auto ">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.company}
            </h2>

            <div className="flex mb-4 space-between">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>
              <span
                className="flex ml-auto border-gray-200 space-x-2s cursor-pointer"
                onClick={shareHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 22C17.1667 22 16.4583 21.7083 15.875 21.125C15.2917 20.5417 15 19.8333 15 19C15 18.8833 15.0083 18.7623 15.025 18.637C15.0417 18.5117 15.0667 18.3993 15.1 18.3L8.05 14.2C7.76667 14.45 7.45 14.646 7.1 14.788C6.75 14.93 6.38333 15.0007 6 15C5.16667 15 4.45833 14.7083 3.875 14.125C3.29167 13.5417 3 12.8333 3 12C3 11.1667 3.29167 10.4583 3.875 9.875C4.45833 9.29167 5.16667 9 6 9C6.38333 9 6.75 9.071 7.1 9.213C7.45 9.355 7.76667 9.55067 8.05 9.8L15.1 5.7C15.0667 5.6 15.0417 5.48767 15.025 5.363C15.0083 5.23833 15 5.11733 15 5C15 4.16667 15.2917 3.45833 15.875 2.875C16.4583 2.29167 17.1667 2 18 2C18.8333 2 19.5417 2.29167 20.125 2.875C20.7083 3.45833 21 4.16667 21 5C21 5.83333 20.7083 6.54167 20.125 7.125C19.5417 7.70833 18.8333 8 18 8C17.6167 8 17.25 7.92933 16.9 7.788C16.55 7.64667 16.2333 7.45067 15.95 7.2L8.9 11.3C8.93333 11.4 8.95833 11.5127 8.975 11.638C8.99167 11.7633 9 11.884 9 12C9 12.1167 8.99167 12.2377 8.975 12.363C8.95833 12.4883 8.93333 12.6007 8.9 12.7L15.95 16.8C16.2333 16.55 16.55 16.3543 16.9 16.213C17.25 16.0717 17.6167 16.0007 18 16C18.8333 16 19.5417 16.2917 20.125 16.875C20.7083 17.4583 21 18.1667 21 19C21 19.8333 20.7083 20.5417 20.125 21.125C19.5417 21.7083 18.8333 22 18 22ZM18 6C18.2833 6 18.521 5.904 18.713 5.712C18.905 5.52 19.0007 5.28267 19 5C19 4.71667 18.904 4.479 18.712 4.287C18.52 4.095 18.2827 3.99933 18 4C17.7167 4 17.479 4.096 17.287 4.288C17.095 4.48 16.9993 4.71733 17 5C17 5.28333 17.096 5.521 17.288 5.713C17.48 5.905 17.7173 6.00067 18 6ZM6 13C6.28333 13 6.521 12.904 6.713 12.712C6.905 12.52 7.00067 12.2827 7 12C7 11.7167 6.904 11.479 6.712 11.287C6.52 11.095 6.28267 10.9993 6 11C5.71667 11 5.479 11.096 5.287 11.288C5.095 11.48 4.99933 11.7173 5 12C5 12.2833 5.096 12.521 5.288 12.713C5.48 12.905 5.71733 13.0007 6 13ZM18 20C18.2833 20 18.521 19.904 18.713 19.712C18.905 19.52 19.0007 19.2827 19 19C19 18.7167 18.904 18.479 18.712 18.287C18.52 18.095 18.2827 17.9993 18 18C17.7167 18 17.479 18.096 17.287 18.288C17.095 18.48 16.9993 18.7173 17 19C17 19.2833 17.096 19.521 17.288 19.713C17.48 19.905 17.7173 20.0007 18 20Z"
                    fill="#D0D5DD"
                  />
                </svg>
              </span>
            </div>
            <p className="leading-relaxed inline-block">{product?.context}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center">
                <div className="relative">
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"></span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span
                className="title-font font-medium text-2xl mr-2"
                style={{ color: "#5FD100" }}
              >
                {product?.sales ? `${product?.sales + "%"}` : null}
              </span>
              <span className="title-font font-medium text-2xl text-gray-900">
                {product?.price
                  ? product?.price.toLocaleString("ko-KR") + "원"
                  : null}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
              className="xl:mt-28 mt-20"
            >
              {likedByUser?.length ? (
                <button onClick={likeHandler} className="bottom-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M22.25 3.5C19.7388 3.5 17.51 4.49125 16 6.195C14.49 4.49125 12.2613 3.5 9.75 3.5C7.56278 3.50265 5.46589 4.37269 3.91929 5.91929C2.37269 7.46589 1.50265 9.56278 1.5 11.75C1.5 20.7925 14.7263 28.0175 15.2888 28.3212C15.5073 28.439 15.7517 28.5006 16 28.5006C16.2483 28.5006 16.4927 28.439 16.7113 28.3212C17.2738 28.0175 30.5 20.7925 30.5 11.75C30.4974 9.56278 29.6273 7.46589 28.0807 5.91929C26.5341 4.37269 24.4372 3.50265 22.25 3.5Z"
                      fill="#5FD100"
                    />
                  </svg>
                  <p className="text-[12px] " style={{ color: "#5FD100" }}>
                    {product?.like_count}
                  </p>
                </button>
              ) : (
                <button onClick={likeHandler} className="bottom-2 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M22.25 3.5C19.7388 3.5 17.51 4.49125 16 6.195C14.49 4.49125 12.2612 3.5 9.75 3.5C7.56278 3.50265 5.46589 4.37269 3.91929 5.91929C2.37269 7.46589 1.50265 9.56278 1.5 11.75C1.5 20.7925 14.7262 28.0175 15.2887 28.3213C15.5073 28.439 15.7517 28.5006 16 28.5006C16.2483 28.5006 16.4927 28.439 16.7113 28.3213C17.2738 28.0175 30.5 20.7925 30.5 11.75C30.4974 9.56278 29.6273 7.46589 28.0807 5.91929C26.5341 4.37269 24.4372 3.50265 22.25 3.5ZM21.5637 21.295C19.8228 22.7723 17.9618 24.1019 16 25.27C14.0382 24.1019 12.1772 22.7723 10.4362 21.295C7.7275 18.9713 4.5 15.4275 4.5 11.75C4.5 10.3576 5.05312 9.02225 6.03769 8.03769C7.02225 7.05312 8.35761 6.5 9.75 6.5C11.975 6.5 13.8375 7.675 14.6112 9.5675C14.7239 9.84338 14.9161 10.0795 15.1634 10.2457C15.4108 10.4118 15.702 10.5006 16 10.5006C16.298 10.5006 16.5892 10.4118 16.8366 10.2457C17.0839 10.0795 17.2761 9.84338 17.3888 9.5675C18.1625 7.675 20.025 6.5 22.25 6.5C23.6424 6.5 24.9777 7.05312 25.9623 8.03769C26.9469 9.02225 27.5 10.3576 27.5 11.75C27.5 15.4275 24.2725 18.9713 21.5637 21.295Z"
                      fill="#D0D5DD"
                    />
                  </svg>
                  <p className="text-[12px] text-gray-400">
                    {product?.like_count}
                  </p>
                </button>
              )}
              <button
                className="flex text-white bg-gray-900 border-0 py-4 sm:px-24 px-20 focus:outline-none hover:bg-gray-600 rounded-2xl"
                onClick={() => window.open(`${product?.website}`)}
              >
                구매하러 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
