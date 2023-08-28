"use client";

import React from "react";
import Script from "next/script";
// import KakaoMaps from "@/components/restaurant/KakaoMaps";
import Header from "@/components/Header";
import KakaoMap from "../utils/kakaoMap";

const Restaurant = () => {
  return (
    <>
      <Header />
      <div>Restaurant</div>
      {/* <KakaoMaps /> */}
      <KakaoMap />
    </>
  );
};

export default Restaurant;
