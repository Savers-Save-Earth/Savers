"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const Maps = () => {
  const [map, setMap] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("전체"); // 기본값으로 "전체" 카테고리 설정

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 5,
    };
    const setInitLocation = async () => {
      const locPosition = await getCurrentCoordinate();
      options.center = locPosition;
      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);
    };

    const getCurrentCoordinate = async () => {
      return new Promise((res, rej) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const coordinate = new window.kakao.maps.LatLng(lat, lon);
            res(coordinate);
          });
        } else {
          rej(new Error("현재 위치를 불러올 수 없습니다."));
        }
      });
    };

    setInitLocation();
  }, []);

  useEffect(() => {
    if (!map) return;

    const searchPlaces = async (coordinate: any) => {
      const ps = new window.kakao.maps.services.Places();

      const options = {
        location: coordinate,
        radius: 10000,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      };

      let keyword = "";
      if (currentCategory !== "전체") {
        keyword = currentCategory; // 카테고리가 "전체"가 아닐 때만 카테고리명을 키워드로 사용
      }

      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);
          }
        },
        options,
      );
    };

    const displayPlaces = (places) => {
      removeMarker();

      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });

        var iwContent = `<div>${place.place_name}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          infowindow.close();
        });

        markers.push(marker);
      });
    };

    const removeMarker = () => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
    };

    let markers = [];

    const mapIdleHandler = () => {
      const latlng = map.getCenter();
      const coordinate = new window.kakao.maps.LatLng(
        latlng.getLat(),
        latlng.getLng(),
      );
      searchPlaces(coordinate);
    };

    window.kakao.maps.event.addListener(map, "idle", mapIdleHandler);

    return () => {
      window.kakao.maps.event.removeListener(map, "idle", mapIdleHandler);
    };
  }, [map, currentCategory]);

  return (
    <div style={{ marginTop: "40px" }}>
      <div
        id="map"
        style={{
          width: "100vw",
          height: "calc(100vh - 40px)", // 버튼의 높이만큼 빼줌
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px", // 버튼이 보일 위치 조정
            left: "10px", // 버튼이 보일 위치 조정
            zIndex: 1000, // 버튼이 위에 표시되도록 zIndex 설정
          }}
        >
          {/* 카테고리 선택 버튼 */}
          <button onClick={() => setCurrentCategory("전체")}>전체</button>
          <button onClick={() => setCurrentCategory("식당")}>식당</button>
          <button onClick={() => setCurrentCategory("카페")}>카페</button>
        </div>
      </div>
    </div>
  );
};

export default Maps;
