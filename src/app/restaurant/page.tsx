"use client";

import React from "react";
import Script from "next/script";
import Header from "@/components/Header";
import KakaoMap from "../utils/kakaoMap";

const Restaurant = () => {
  return (
    <>
      <Header />
      <KakaoMap />
    </>
  );
};

export default Restaurant;
