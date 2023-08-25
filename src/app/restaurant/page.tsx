import React from "react";
import Maps from "@/components/restaurant/Maps";
import Script from "next/script";
import KakaoMaps from "@/components/restaurant/KakaoMaps";
import TestMaps from "@/components/restaurant/TestMaps";

const Restaurant = () => {
  const KakaoMapSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services`;
  // const KakaoMapLib = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services`;

  return (
    <>
      <div>Restaurant</div>
      <Script async src={KakaoMapSrc} strategy="beforeInteractive" />
      {/* <Script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=20943b4a22719502dc157b55da145827&libraries=services" /> */}
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=20943b4a22719502dc157b55da145827&libraries=services"
      ></script>
      {/* <Maps /> */}
      {/* <KakaoMaps /> */}
      <TestMaps />
    </>
  );
};

export default Restaurant;
