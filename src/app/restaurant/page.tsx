"use client";

import React from "react";

import KakaoMap from "@/libs/kakaoMap";
import { useEffect } from "react";
import MarkerLists from "@/components/restaurant/MarkerLists";

const Restaurant = () => {
  // const { Kakao } = window;
  //window오류로 useEffect안으로 이동
  useEffect(() => {
    const { Kakao } = window;
    if (!Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_KEY);
    }
  }, []);
  return (
    <>
      <KakaoMap />
    </>
  );
};

export default Restaurant;
