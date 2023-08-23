"use client";

import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMaps = () => {
  //현재 위치 가져오기
  const [location, setLoacation] = useState(null); // 현재 위치를 저장할 상태

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const successHandler = (response) => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  //검색 마커

  return (
    <>
      {location && (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          <MapMarker
            position={{ lat: location.latitude, lng: location.longitude }}
          />
        </Map>
      )}
    </>
  );
};

export default KakaoMaps;
