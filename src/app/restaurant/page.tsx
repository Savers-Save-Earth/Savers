"use client";

import React from "react";

import KakaoMap from "../utils/kakaoMap";
import { useEffect } from "react";

const Restaurant = () => {
  useEffect(() => {
    if (!kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_KEY);
    }
  }, []);
  return (
    <>
      <KakaoMap />
    </>
  );
};

export default Restaurant;
