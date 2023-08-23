import React from "react";
import Maps from "@/components/restaurant/Maps";
import Script from "next/script";
import KakaoMaps from "@/components/restaurant/KakaoMaps";

const Restaurant = () => {
  const KakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
  return (
    <>
      <div>Restaurant</div>
      <Maps />
      <KakaoMaps />
      <Script src={KakaoMapSrc} strategy="beforeInteractive" />
    </>
  );
};

export default Restaurant;
