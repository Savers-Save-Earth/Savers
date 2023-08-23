"use client";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }
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
  return (
    <Map center={currentLocation} style={{ width: "100%", height: "500px" }}>
      <MapMarker position={currentLocation}>
        <div>현재위치</div>
      </MapMarker>
    </Map>
  );
};

export default Maps;
