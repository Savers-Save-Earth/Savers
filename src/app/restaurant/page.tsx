// "use client";

import React from "react";
import { Metadata } from "next";
import KakaoMap from "../kakaoMap";

export const metadata: Metadata = {
  title: "비건식당 찾기 | Savers",
  description: "주변의 비건식당을 찾아보세요.",
};

const Restaurant = () => {
  return (
    <>
      <KakaoMap />
    </>
  );
};

export default Restaurant;
