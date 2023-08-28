import React from "react";

const MarkerLists = ({ markerList }) => {
  console.log(markerList);
  return (
    <div>
      <h2>마커 리스트 컴포넌트</h2>
      <ul>
        {/* markerList 정보를 사용하여 리스트를 렌더링합니다 */}
        {markerList.map((place, index) => (
          <li key={index}>{place.place_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MarkerLists;
