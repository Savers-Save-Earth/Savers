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

  const getKeywordMarker = () => {};

  // const KakaoMapLib = `//dapi.kakao.com/v2/maps/sdk.js?appkey==${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services,clusterer,drawing`;

  return (
    <div>
      <script type="text/javascript" src={KakaoMapLib}></script>
      <Map center={currentLocation} style={{ width: "100%", height: "500px" }}>
        <MapMarker position={currentLocation}>
          <div>현재위치</div>
        </MapMarker>
        {/* {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))} */}
      </Map>
    </div>
  );
};

export default Maps;
