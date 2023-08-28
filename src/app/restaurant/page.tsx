import React from "react";
import Script from "next/script";
import Header from "@/components/Header";
import KakaoMap from "../utils/kakaoMap";

const Restaurant = () => {
  return (
    <>
      <Header />
      <div>Restaurant</div>
      <KakaoMap />
    </>
  );
};

export default Restaurant;
