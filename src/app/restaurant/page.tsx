"use client";

import React from "react";

import KakaoMap from "../utils/kakaoMap";
import { useEffect } from "react";
import MarkerLists from "@/components/restaurant/MarkerLists";

const Restaurant = () => {
  const { Kakao } = window;
  useEffect(() => {
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
