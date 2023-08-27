"use client";

import React, { useState, useEffect } from "react";

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
  const [currentCategory, setCurrentCategory] = useState(""); // 기본값으로 "전체" 카테고리 설정

  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    /**
     * 사용자의 현재 위치 얻어오기
     */
    const setInitLocation = async () => {
      let locPosition = await getCurrentCoordinate();

      setMapCenter({
        x: locPosition.La,
        y: locPosition.Ma,
      });

      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);

      //현재 위치에 마커 표시
      new kakao.maps.Marker({
        position: locPosition,
        map: map,
      });

      //   CoordPlaces.refetch();
    };
    setInitLocation();

    //
    //
    //
    const searchPlaces = async (coordinate: any) => {
      const ps = new window.kakao.maps.services.Places();

      const options = {
        location: coordinate,
        radius: 10000,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      };

      ps.keywordSearch(
        currentCategory,
        (data: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);
          }
        },
        options,
      );
    };

    const displayPlaces = (places: any) => {
      removeMarker();

      places.forEach((place: any) => {
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
  }, [currentCategory]);
  return (
    <div style={{ marginTop: "40px" }}>
      <div>카카오맵입니다</div>
      <button onClick={() => setCurrentCategory("비건")}>전체</button>
      <button onClick={() => setCurrentCategory("비건식당")}>식당</button>
      <button onClick={() => setCurrentCategory("비건베이커리")}>
        베이커리
      </button>
      <button onClick={() => setCurrentCategory("비건카페")}>카페</button>
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
