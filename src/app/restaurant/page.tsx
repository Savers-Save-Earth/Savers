"use client";

import React from "react";

import KakaoMap from "../utils/kakaoMap";
import { useEffect } from "react";

const Restaurant = () => {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const { Kakao } = window;

  //     if (!Kakao.isInitialized()) {
  //       // SDK 초기화 부분, 본인의 API KEY 입력
  //       Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  //     }
  return (
    <>
      <KakaoMap />
    </>
  );
};

export default Restaurant;
