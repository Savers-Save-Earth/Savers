"use client";

import React from "react";

import KakaoMap from "../utils/kakaoMap";
import { useEffect } from "react";

const Restaurant = () => {
  // const Kakao = window.kakao;
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
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
