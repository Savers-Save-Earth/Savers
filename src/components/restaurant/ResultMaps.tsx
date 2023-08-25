"use client";

import React, { useEffect, useState } from "react";

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

const ResultMaps = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 5,
    };
    const setInitLocation = async () => {
      const locPosition = await getCurrentCoordinate();
      options.center = locPosition;
      const newMap = new kakao.maps.Map(container, options);
      setMap(newMap);
    };

    const getCurrentCoordinate = async () => {
      return new Promise((res, rej) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const coordinate = new kakao.maps.LatLng(lat, lon);
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

    const searchPlaces = async (coordinate) => {
      const ps = new window.kakao.maps.services.Places();

      const options = {
        location: coordinate,
        radius: 10000,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      };

      ps.keywordSearch(
        "비건",
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

        // window.kakao.maps.event.addListener(marker, "click", function () {
        //   displayInfowindow(marker, place);
        // });

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
  }, [map]);

  //   const displayInfowindow = (marker, place) => {
  //     const content = `<div>${place.place_name}</div>`;
  //     const infowindow = new kakao.maps.InfoWindow({ content: content });
  //     infowindow.open(map, marker);
  //   };

  return (
    <div
      id="map"
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default ResultMaps;
