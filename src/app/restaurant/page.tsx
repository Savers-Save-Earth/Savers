import React from "react";
import Script from "next/script";
import ResultMaps from "@/components/restaurant/ResultMaps";

const Restaurant = () => {
  const KakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
  const KakaoMapLib = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services`;

  return (
    <>
      <div>Restaurant</div>
      <Script async src={KakaoMapSrc} strategy="beforeInteractive" />
      {/* <Script type="text/javascript" src={KakaoMapLib} /> */}
      <script type="text/javascript" src={KakaoMapLib}></script>
      <ResultMaps />
    </>
  );
};

export default Restaurant;
