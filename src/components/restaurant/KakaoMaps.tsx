"use client";

import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

const getCurrentCoordinate = async () => {
  return new Promise((res, rej) => {
    // HTML5의 geolocaiton으로 사용할 수 있는지 확인합니다.
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도

        const coordinate = new kakao.maps.LatLng(lat, lon);
        res(coordinate);
      });
    } else {
      rej(new Error("현재 위치를 불러올 수 없습니다."));
    }
  });
};

const KakaoMaps = () => {
  const [mapCenter, setMapCenter] = useState({ x: 127.1086228, y: 37.4012191 });

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // const setInitLocation = async () => {
    //   let locPosition = await getCurrentCoordinate();

    //   setMapCenter({
    //     x: locPosition.La,
    //     y: locPosition.Ma,
    //   });

    //   // 지도 중심좌표를 접속위치로 변경합니다
    //   map.setCenter(locPosition);

    //   //현재 위치에 마커 표시
    //   new window.kakao.maps.Marker({
    //     position: locPosition,
    //     map: map,
    //   });

    //   //   CoordPlaces.refetch();
    // };
    // setInitLocation();
  });
  return (
    <div style={{ marginTop: "40px" }}>
      <div>카카오맵입니다</div>
      <div
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    </div>
  );
};

export default KakaoMaps;
