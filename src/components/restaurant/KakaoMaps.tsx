"use client";

import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMaps = () => {
  //   //현재 위치 가져오기
  //   const [location, setLoacation] = useState(null); // 현재 위치를 저장할 상태

  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  //   }, []);

  //   const successHandler = (response) => {
  //     console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
  //     const { latitude, longitude } = response.coords;
  //     setLoacation({ latitude, longitude });
  //   };

  //   const errorHandler = (error) => {
  //     console.log(error);
  //   };

  //   //검색 마커

  //   return (
  //     <>
  //       {location && (
  //         <Map
  //           center={{ lat: location.latitude, lng: location.longitude }}
  //           style={{ width: "800px", height: "600px" }}
  //           level={3}
  //         >
  //           <MapMarker
  //             position={{ lat: location.latitude, lng: location.longitude }}
  //           />
  //         </Map>
  //       )}
  //     </>
  //   );
  const [currentLocation, setCurrentLocation] = useState({
    lat: 33.5563,
    lng: 126.79581,
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch("비건푸드", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <Map // 로드뷰를 표시할 Container
      center={currentLocation}
      style={{
        width: "100%",
        height: "350px",
      }}
      level={3}
      onCreate={setMap}
    >
      {/* <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=20943b4a22719502dc157b55da145827&libraries=services"
      ></script> */}
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && (
            <div style={{ color: "#000" }}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};

export default KakaoMaps;
