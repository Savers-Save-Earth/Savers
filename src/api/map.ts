import axios from "axios";

interface CoordResponse {
  address_name: string;
  documents: any[]; // 데이터 구조에 맞게 타입 정의 필요
}

interface PlaceResponse {
  documents: any[]; // 데이터 구조에 맞게 타입 정의 필요
}

/**
 * 행정구역정보 및 키워드로 장소 검색하기
 * @param {*} CoordResponse
 * @param {*} selectedCategoryName
 * @returns
 */
const getSearch = async (
  CoordResponse: CoordResponse,
  selectedCategoryName: string,
): Promise<PlaceResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}/search/keyword.json?query=${CoordResponse.address_name}${selectedCategoryName}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}`,
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
const getCoord = async (
  coordX: number,
  coordY: number,
  selectedCategoryName: string,
): Promise<any> => {
  const CoordResponse = await axios.get<CoordResponse>(
    `${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}/geo/coord2regioncode.json?x=${coordX}&y=${coordY}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}`,
      },
    },
  );

  // 장소 검색
  const placesResponse = await getSearch(
    CoordResponse.data,
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
