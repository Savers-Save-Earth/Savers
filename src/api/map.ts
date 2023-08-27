import axios from "axios";

/**
 * 행정구역정보 및 키워드로 장소 검색하기
 * @param {*} CoordResponse
 * @param {*} selectedCategoryName
 * @returns
 */
const getSearch = async (CoordResponse, selectedCategoryName) => {
  const response = await axios.get(
    `${process.env.REACT_APP_KAKAO_MAP_LOCAL_URL}/search/keyword.json?query=${CoordResponse.address_name}${selectedCategoryName}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_LOCAL_KEY}`,
      },
    },
  );
  return response.data;
};

/**
 * 좌표로 행정구역정보 받기
 * @param {*} coordX
 * @param {*} coordY
 * @param {*} selectedCategoryName
 * @returns
 */
const getCoord = async (coordX, coordY, selectedCategoryName) => {
  const CoordResponse = await axios.get(
    `${process.env.REACT_APP_KAKAO_MAP_LOCAL_URL}/geo/coord2regioncode.json?x=${coordX}&y=${coordY}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_LOCAL_KEY}`,
      },
    },
  );

  // 장소 검색
  const placesResponse = await getSearch(
    CoordResponse.data.documents[0],
    selectedCategoryName,
  );

  // 행정구역 정확히 일치하는 것만 필터링해서 return
  const region_3depth_name =
    CoordResponse.data.documents[0].region_3depth_name.replace("동", "");
  return {
    coord: CoordResponse.data.documents[0],
    places: placesResponse.documents.filter((item) =>
      item.address_name.includes(region_3depth_name),
    ),
  };
};

export { getCoord };
