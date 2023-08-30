"use client";

import React from "react";
import Script from "next/script";
import KakaoMap from "../utils/kakaoMap";
import { useEffect } from "react";

const Restaurant = () => {
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
