"use client";

import React, { useEffect, useState } from "react";
import MarkerLists from "@/components/restaurant/MarkerLists";

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

const KakaoMap = () => {
  const [mapCenter, setMapCenter] = useState({ x: 127.1086228, y: 37.4012191 });
  const [currentCategory, setCurrentCategory] = useState(""); // 기본값으로 "전체" 카테고리 설정
  const [markerList, setMarkerList] = useState([]); // 마커 리스트 상태 추가
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        // id가 'map'인 요소에 지도를 생성
        const Container = document.getElementById("map");
        const Option = {
          // 해당 좌표는 서울 시청을 중심으로 함
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          // 줌 레벨 3으로 설정
          level: 5,
        };
        const map = new window.kakao.maps.Map(Container, Option);

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

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

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

          const newMarkerList = [];

          places.forEach((place: any) => {
            const markerPosition = new window.kakao.maps.LatLng(
              place.y,
              place.x,
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: map,
            });

            var iwContent = `<div style= "padding: 5px; width: 250px; border-radius:5px">
            <p class="infoWindow-name" style="font-size: 13px; color: #4e4e4e">${place.category_name}</p>
        <h1 class="infoWindow-name" style="font-weight: bold">${place.place_name}</h1>
        <p class="infoWindow-address" style="font-size: 13px; color: #1f1f1f">${place.address_name}</p>
        <p class="infoWindow-road-address" style="font-size: 13px; color: #1f1f1f">(지번)${place.road_address_name}</p>
        <p class="infoWindow-phone"style="font-size: 13px; color: #1f1f1f" >${place.phone}</p>
        <a href=${place.place_url} " target="_blank"><button style="background-color:#10C800; color:white; font-size: 13px; padding:3px; width: 240px">상세보기</button></a>
        </div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

            var iwRemoveable = true;

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
              content: iwContent,
              removable: iwRemoveable,
            });

            window.kakao.maps.event.addListener(marker, "click", function () {
              // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);
            });

            // window.kakao.maps.event.addListener(marker, "mouseover", function () {
            //   // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            //   infowindow.open(map, marker);
            // });

            // 마커에 마우스아웃 이벤트를 등록합니다
            // window.kakao.maps.event.addListener(
            //   marker,
            //   "mouseout",
            //   function () {
            //     // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            //     infowindow.close();
            //   },
            // );

            // 마커에 마우스아웃 이벤트: map을 누르면 실행
            window.kakao.maps.event.addListener(map, "click", function () {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
            });

            markers.push(marker);
            newMarkerList.push(place);
          });
          setMarkerList(newMarkerList);
          console.log("MArkerlist-->", newMarkerList);
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
      });
    }
  }, [currentCategory]);

  return (
    <div style={{ marginTop: "40px" }}>
      <div>비건식당 찾기</div>
      <button onClick={() => setCurrentCategory("비건")}>전체</button>
      <button onClick={() => setCurrentCategory("비건식당")}>식당</button>
      <button onClick={() => setCurrentCategory("비건베이커리")}>
        베이커리
      </button>
      <button onClick={() => setCurrentCategory("비건카페")}>카페</button>
      <div
        id="map"
        style={{
          width: "50vw",
          height: "50vh",
        }}
      ></div>
      <MarkerLists markerList={markerList} />
      <div></div>
    </div>
  );
};

export default KakaoMap;
