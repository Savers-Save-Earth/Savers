"use client";
// import { Map, MapMarker } from "react-kakao-maps-sdk";
// import { useEffect, useState } from "react";

// const Maps = () => {
//   const [currentLocation, setCurrentLocation] = useState({
//     lat: 33.5563,
//     lng: 126.79581,
//   });

//   //현재 위치
//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error("Error getting current location:", error);
//         },
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     getCurrentLocation();
//   }, []);

//   return (
//     <div>
//       <Map
//         center={currentLocation}
//         style={{ width: "100%", height: "500px" }}
//         level={4}
//       >
//         <MapMarker position={currentLocation}>
//           <div>현재위치</div>
//         </MapMarker>
//       </Map>
//     </div>
//   );
// };

// export default Maps;
import React, { useEffect } from "react";

const Maps = () => {
  useEffect(() => {
    const mapOptions = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 13,
    };

    const map = new window.kakao.maps.Map(
      document.getElementById("map"),
      mapOptions,
    );
    const places = new window.kakao.maps.services.Places();

    function searchAndDisplay(keyword) {
      places.keywordSearch(keyword, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          result.forEach((place) => {
            const markerPosition = new window.kakao.maps.LatLng(
              place.y,
              place.x,
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: map,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
              const infowindow = new window.kakao.maps.InfoWindow({
                content:
                  '<div style="padding:5px;font-size:12px;">' +
                  place.place_name +
                  "</div>",
              });
              infowindow.open(map, marker);
            });
          });
        }
      });
    }

    const veganRestaurantBtn = document.createElement("button");
    veganRestaurantBtn.textContent = "비건 음식점";
    document.body.appendChild(veganRestaurantBtn);
    veganRestaurantBtn.addEventListener("click", () => {
      searchAndDisplay("비건 음식점");
    });

    const veganCafeBtn = document.createElement("button");
    veganCafeBtn.textContent = "비건 카페";
    document.body.appendChild(veganCafeBtn);
    veganCafeBtn.addEventListener("click", () => {
      searchAndDisplay("비건 카페");
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default Maps;
