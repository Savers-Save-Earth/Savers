"use client";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";

const Maps = () => {
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

  // const KakaoMapLib = `//dapi.kakao.com/v2/maps/sdk.js?appkey=20943b4a22719502dc157b55da145827&libraries=services`;

  return (
    <div>
      {/* <script type="text/javascript" src={KakaoMapLib}></script> */}
      <Map
        center={currentLocation}
        style={{ width: "100%", height: "500px" }}
        level={4}
      >
        <MapMarker position={currentLocation}>
          <div>현재위치</div>
        </MapMarker>
      </Map>
    </div>
  );
};

export default Maps;
