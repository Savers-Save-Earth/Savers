"use client";
import React, { useEffect, useState } from "react";
import MarkerLists from "@/components/restaurant/MarkerLists";
import { ToastError } from "@/libs/toastifyAlert";
import MapLoading from "@/components/restaurant/MapLoading";

const getCurrentCoordinate = async () => {
  return new Promise((res, rej) => {
    // HTML5의 geolocation을 이용해서 위치 권한을 확인합니다.
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
            navigator.geolocation.getCurrentPosition(function (position) {
              const lat = position.coords.latitude; // 위도
              const lon = position.coords.longitude; // 경도
              const coordinate = new kakao.maps.LatLng(lat, lon);
              res(coordinate);
            });
          } else {
            rej(ToastError("위치 권한을 허용해주세요"));
          }
        })
        .catch((error) => {
          rej(ToastError("위치 권한을 확인하는 동안 오류가 발생했습니다"));
        });
    } else {
      rej(ToastError("위치 권한을 허용해주세요"));
    }
  });
};

const KakaoMap = () => {
  const [currentCategory, setCurrentCategory] = useState("비건"); // 기본값으로 "전체" 카테고리 설정
  const [markerList, setMarkerList] = useState([]); // 마커 리스트 상태 추가
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      if (window.kakao) {
        window.kakao.maps.load(async () => {
          let locPosition: any = await getCurrentCoordinate();
          // id가 'map'인 요소에 지도를 생성s
          const Container = document.getElementById("map");
          const Option = {
            center: new window.kakao.maps.LatLng(
              locPosition.La,
              locPosition.Ma,
            ),
            level: 5,
          };
          const map = new window.kakao.maps.Map(Container, Option);

          // 지도 중심좌표를 접속위치로 변경합니다
          const setInitLocation = async () => {
            let locPosition: any = await getCurrentCoordinate();
            map.setCenter(locPosition);
            setIsLoading(false);
            //현재 위치에 마커 표시
            new kakao.maps.Marker({
              position: locPosition,
              map: map,
            });
          };
          setInitLocation();

          // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
          let mapTypeControl = new kakao.maps.MapTypeControl();
          // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
          // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
          map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
          // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
          let zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
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
            const newMarkerList: any = [];
            let imgSrc = "";
            places.forEach((place: any) => {
              const markerPosition = new window.kakao.maps.LatLng(
                place.y,
                place.x,
              );
              if (currentCategory === "비건") {
                imgSrc = "/images/Pin.svg";
              }
              if (currentCategory === "비건베이커리") {
                imgSrc = "/images/bakeryPin.svg";
              }
              if (currentCategory === "비건식당") {
                imgSrc = "/images/foodPin.svg";
              }
              if (currentCategory === "비건카페") {
                imgSrc = "/images/cafePin.svg";
              }
              let imgSize = new kakao.maps.Size(38, 38),
                imgOption = { offset: new kakao.maps.Point(27, 69) };
              const markerImg = new window.kakao.maps.MarkerImage(
                imgSrc,
                imgSize,
                imgOption,
              );
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImg,
                map: map,
              });

              let content = document.createElement("div");
              // 커스텀 오버레이 엘리먼트를 만들고, 컨텐츠를 추가합니다
              let info = document.createElement("div");
              info.className = "overlay";
              info.innerHTML = `<div style= "background-color:white; padding: 10px; padding-left:15px; width: 250px; border-radius: 20px; cursor:text;">
            <h1 class="infoWindow-name" style="font-weight: bold">${place.place_name}</h1>
             <p class="infoWindow-address" style="font-size: 13px; color: rgb(148 163 184)">${place.address_name}</p>
             <p class="infoWindow-road-address" style="font-size: 13px; color: rgb(148 163 184)">(지번)${place.road_address_name}</p>
             <p class="infoWindow-phone"style="font-size: 13px; color: rgb(148 163 184)" >${place.phone}</p>
             <a href=${place.place_url} " target="_blank"><button style="margin-left: 60px; auto; border-radius: 15px;  background-color:rgb(249 250 251); color:rgb(100 116 139); font-size: 13px; padding:3px; width: 90px;">상세보기</button></a>
             </div>`;
              content.appendChild(info);
              let closeBtn = document.createElement("button");
              closeBtn.innerHTML = `
            <svg width="27" height="27" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left:110px; background-color: white; padding:8px; border-radius: 50px;">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.292892 0.292895C0.683415 -0.0976304 1.31658 -0.0976317 1.70711 0.292892L7.00002 5.58579L12.2929 0.292942C12.6834 -0.0975817 13.3166 -0.0975803 13.7071 0.292945C14.0976 0.68347 14.0976 1.31663 13.7071 1.70716L8.41424 7L13.7071 12.2928C14.0976 12.6834 14.0976 13.3165 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7.00002 8.41421L1.70711 13.7071C1.31658 14.0976 0.683415 14.0976 0.292892 13.7071C-0.0976317 13.3166 -0.0976304 12.6834 0.292895 12.2929L5.58581 7L0.292895 1.70711C-0.0976304 1.31658 -0.0976317 0.68342 0.292892 0.292895Z" fill="#98A2B3"/>
            </svg>
            `;
              // 닫기 이벤트 추가
              closeBtn.onclick = function () {
                overlay.setMap(null);
              };
              content.appendChild(closeBtn);
              let overlay = new window.kakao.maps.CustomOverlay({
                content: content,
                position: marker.getPosition(),
              });
              // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
              window.kakao.maps.event.addListener(marker, "click", function () {
                overlay.setMap(map);
              });
              markers.push(marker);
              newMarkerList.push(place);
            });
            setMarkerList(newMarkerList);
          };
          // 마커 제거
          const removeMarker = () => {
            markers.forEach((marker: any) => {
              marker.setMap(null);
            });
            markers = [];
          };
          let markers: any = [];

          //지도 이동 지역설정
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
    };
  }, [currentCategory]);
  return (
    <div>
      <div className="pt-16 lg:pt-28">
        <h1 className="hidden lg:flex mb-3 text-2xl text-gray-900  font-semibold ">
          비건식당 찾기
        </h1>
        <div id="pageBody">
          <div
            id="map"
            className="w-full h-56 mb-2 lg:h-[35vw] lg:w-[70%] lg:float-right"
          >
            {isLoading && <MapLoading />}
          </div>
          <div id="pageLeft" className="w-full lg:w-[29%] lg:float-left">
            <div id="buttons" className="mb-3">
              <button
                onClick={() => setCurrentCategory("비건")}
                className={`categoryBtn ${
                  currentCategory === "비건" ? "active" : ""
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setCurrentCategory("비건식당")}
                className={`categoryBtn ${
                  currentCategory === "비건식당" ? "active" : ""
                }`}
              >
                식당
              </button>
              <button
                onClick={() => setCurrentCategory("비건베이커리")}
                className={`categoryBtn ${
                  currentCategory === "비건베이커리" ? "active" : ""
                }`}
              >
                베이커리
              </button>
              <button
                onClick={() => setCurrentCategory("비건카페")}
                className={`categoryBtn ${
                  currentCategory === "비건카페" ? "active" : ""
                }`}
              >
                카페
              </button>
            </div>
            <MarkerLists
              markerList={markerList}
              currentCategory={currentCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default KakaoMap;
