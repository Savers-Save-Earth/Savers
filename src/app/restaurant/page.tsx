"use client";

import React from "react";
import Script from "next/script";
import Header from "@/components/Header";
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
      <Header />
      <KakaoMap />
    </>
  );
};

export default Restaurant;
