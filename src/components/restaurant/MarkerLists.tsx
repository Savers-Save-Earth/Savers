"use client";
import supabase from "@/libs/supabase";
import React, { useEffect } from "react";
import { useState } from "react";
import { Database } from "@/types/supabase";

interface MarkList {
  id: number;
  restaurant_name: string;
  restaurant_address: string;
  bookmarkCount: number;
}

type LikeType = Database["public"]["Tables"]["like_restaurant"]["Row"];
type NewLikeType = Database["public"]["Tables"]["like_restaurant"]["Insert"];

const MarkerLists = ({ markerList }: any) => {
  const [markedList, setMarkedList] = useState<MarkList[]>([]);
  const [user, setUser] = useState<any>(null);
  const [markedByUser, setMarkedByUser] = useState<any[]>([]);

  const fetchMarkList = async () => {
    const { data: markedData } = await supabase
      .from("like_restaurant")
      .select();

    if (markedData) {
      setMarkedList(markedData);
    } else {
      return;
    }
  };

  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(false);
      } else {
        setUser(user);
        fetchUserBookmark(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchUserBookmark = async (user: any) => {
    const { data: existingMarkedData, error: existingLikeError } =
      await supabase.from("like_restaurant").select().eq("user_id", user.id);
    setMarkedByUser(existingMarkedData!);
    console.log("북마크된애들", existingMarkedData);
  };

  const bookmarkHandler = (place: string) => {
    const countMarkedList = markedList.filter(
      (item) => item.restaurant_name === place,
    ).length;
    return countMarkedList;
  };

  const addMarkList = async (
    category: string,
    name: string,
    address: string,
    url: string,
  ) => {
    if (user) {
      const { data: userMarkList } = await supabase
        .from("like_restaurant")
        .select()
        .eq("user_id", user.id)
        .eq("restaurant_name", name);
      console.log(userMarkList);

      if (userMarkList?.length !== 0) {
        const { error: addMarkListError } = await supabase
          .from("like_restaurant")
          .delete()
          .eq("user_id", user.id)
          .eq("restaurant_name", name);

        alert("좋아요가 해제되었습니다.");
      } else {
        const { error: addMarkListError } = await supabase
          .from("like_restaurant")
          .insert({
            restaurant_category: category,
            restaurant_address: address,
            restaurant_name: name,
            user_id: user.id,
            restaurant_map: url,
          });
        alert("좋아요를 눌렀습니다.");
      }
    } else {
      alert("로그인 후 사용해주세요.");
      return;
    }
  };

  const toggleMark = async (name: string) => {
    if (markedByUser.some((item) => item.restaurant_name === name)) {
      // 이미 북마크한 경우, 제거
      setMarkedByUser((prevMarkedByUser) =>
        prevMarkedByUser.filter((item) => item.restaurant_name !== name),
      );
    } else {
      // 북마크하지 않은 경우, 추가
      setMarkedByUser((prevMarkedByUser) => [
        ...prevMarkedByUser,
        { restaurant_name: name },
      ]);
    }
  };

  const shareBtn = (place: any) => {
    window.Kakao.Share.sendDefault({
      objectType: "location",
      address: place.address_name,
      addressTitle: place.place_name,
      content: {
        title: place.place_name,
        description: place.place_url,
        imageUrl: "https://ifh.cc/g/flbgkf.webp",
        link: {
          webUrl: "http:localhost:3000",
          mobileWebUrl: "http:localhost:3000",
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            webUrl: "https://place.map.kakao.com/201218594",
            mobileWebUrl: "https://place.map.kakao.com/201218594",
          },
        },
      ],
    });
  };

  useEffect(() => {
    fetchUser();
    fetchMarkList();
  }, []);

  return (
    <div className="overflow-auto h-[33vw]">
      {/* display:flex; justify-content: center; */}
      <ul>
        {/* markerList 정보를 사용하여 리스트를 렌더링합니다 */}
        {markerList.map((place: any, index: number) => (
          <div key={index} className="border text-sm p-2 rounded-lg mb-3 py-4">
            <div className="w-12 h-12 border rounded-full float-left m-2.5 bg-slate-300"></div>
            <div>
              {/* <p>{place.category_name}</p> */}
              <p className="font-bold">{place.place_name}</p>
              <p>{place.address_name}</p>
              {/* <p>📌 {bookmarkHandler(place.place_name)}</p> */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addMarkList(
                    place.category_name,
                    place.place_name,
                    place.address_name,
                    place.place_url,
                  );
                  toggleMark(place.place_name);
                }}
                className="mr-3"
              >
                {markedByUser?.find(
                  (item) => item.restaurant_name === place.place_name,
                ) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    className="inline mr-1"
                  >
                    <path
                      d="M11.125 2.25C9.86938 2.25 8.755 2.74563 8 3.5975C7.245 2.74563 6.13062 2.25 4.875 2.25C3.78139 2.25132 2.73295 2.68635 1.95965 3.45965C1.18635 4.23295 0.751323 5.28139 0.75 6.375C0.75 10.8962 7.36312 14.5088 7.64437 14.6606C7.75367 14.7195 7.87586 14.7503 8 14.7503C8.12414 14.7503 8.24633 14.7195 8.35563 14.6606C8.63688 14.5088 15.25 10.8962 15.25 6.375C15.2487 5.28139 14.8137 4.23295 14.0404 3.45965C13.2671 2.68635 12.2186 2.25132 11.125 2.25ZM10.7819 11.1475C9.91142 11.8861 8.98091 12.5509 8 13.135C7.01909 12.5509 6.08858 11.8861 5.21812 11.1475C3.86375 9.98563 2.25 8.21375 2.25 6.375C2.25 5.67881 2.52656 5.01113 3.01884 4.51884C3.51113 4.02656 4.17881 3.75 4.875 3.75C5.9875 3.75 6.91875 4.3375 7.30562 5.28375C7.36193 5.42169 7.45805 5.53974 7.58172 5.62283C7.70539 5.70592 7.85101 5.7503 8 5.7503C8.14899 5.7503 8.29461 5.70592 8.41828 5.62283C8.54195 5.53974 8.63807 5.42169 8.69438 5.28375C9.08125 4.3375 10.0125 3.75 11.125 3.75C11.8212 3.75 12.4889 4.02656 12.9812 4.51884C13.4734 5.01113 13.75 5.67881 13.75 6.375C13.75 8.21375 12.1362 9.98563 10.7819 11.1475Z"
                      fill="#5FD100"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    className="inline mr-1"
                  >
                    <path
                      d="M11.125 2.25C9.86938 2.25 8.755 2.74563 8 3.5975C7.245 2.74563 6.13062 2.25 4.875 2.25C3.78139 2.25132 2.73295 2.68635 1.95965 3.45965C1.18635 4.23295 0.751323 5.28139 0.75 6.375C0.75 10.8962 7.36312 14.5088 7.64437 14.6606C7.75367 14.7195 7.87586 14.7503 8 14.7503C8.12414 14.7503 8.24633 14.7195 8.35563 14.6606C8.63688 14.5088 15.25 10.8962 15.25 6.375C15.2487 5.28139 14.8137 4.23295 14.0404 3.45965C13.2671 2.68635 12.2186 2.25132 11.125 2.25ZM10.7819 11.1475C9.91142 11.8861 8.98091 12.5509 8 13.135C7.01909 12.5509 6.08858 11.8861 5.21812 11.1475C3.86375 9.98563 2.25 8.21375 2.25 6.375C2.25 5.67881 2.52656 5.01113 3.01884 4.51884C3.51113 4.02656 4.17881 3.75 4.875 3.75C5.9875 3.75 6.91875 4.3375 7.30562 5.28375C7.36193 5.42169 7.45805 5.53974 7.58172 5.62283C7.70539 5.70592 7.85101 5.7503 8 5.7503C8.14899 5.7503 8.29461 5.70592 8.41828 5.62283C8.54195 5.53974 8.63807 5.42169 8.69438 5.28375C9.08125 4.3375 10.0125 3.75 11.125 3.75C11.8212 3.75 12.4889 4.02656 12.9812 4.51884C13.4734 5.01113 13.75 5.67881 13.75 6.375C13.75 8.21375 12.1362 9.98563 10.7819 11.1475Z"
                      fill="#D0D5DD"
                    />
                  </svg>
                )}
                <span style={{ color: "#D0D5DD" }}>
                  {bookmarkHandler(place.place_name)}
                </span>
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="border border-gray-300 rounded-full inline-block cursor-pointer"
                onClick={() => () => shareBtn(place)}
              >
                <path
                  d="M12 14.6666C11.4444 14.6666 10.9722 14.4722 10.5833 14.0833C10.1944 13.6944 10 13.2222 10 12.6666C10 12.5889 10.0056 12.5082 10.0167 12.4246C10.0278 12.3411 10.0444 12.2662 10.0667 12.2L5.36667 9.46665C5.17778 9.63331 4.96667 9.76398 4.73333 9.85865C4.5 9.95331 4.25556 10.0004 4 9.99998C3.44444 9.99998 2.97222 9.80554 2.58333 9.41665C2.19444 9.02776 2 8.55554 2 7.99998C2 7.44442 2.19444 6.9722 2.58333 6.58331C2.97222 6.19442 3.44444 5.99998 4 5.99998C4.25556 5.99998 4.5 6.04731 4.73333 6.14198C4.96667 6.23665 5.17778 6.36709 5.36667 6.53331L10.0667 3.79998C10.0444 3.73331 10.0278 3.65842 10.0167 3.57531C10.0056 3.4922 10 3.41154 10 3.33331C10 2.77776 10.1944 2.30554 10.5833 1.91665C10.9722 1.52776 11.4444 1.33331 12 1.33331C12.5556 1.33331 13.0278 1.52776 13.4167 1.91665C13.8056 2.30554 14 2.77776 14 3.33331C14 3.88887 13.8056 4.36109 13.4167 4.74998C13.0278 5.13887 12.5556 5.33331 12 5.33331C11.7444 5.33331 11.5 5.2862 11.2667 5.19198C11.0333 5.09776 10.8222 4.96709 10.6333 4.79998L5.93333 7.53331C5.95556 7.59998 5.97222 7.67509 5.98333 7.75865C5.99444 7.8422 6 7.92265 6 7.99998C6 8.07776 5.99444 8.15842 5.98333 8.24198C5.97222 8.32554 5.95556 8.40042 5.93333 8.46665L10.6333 11.2C10.8222 11.0333 11.0333 10.9029 11.2667 10.8086C11.5 10.7144 11.7444 10.6671 12 10.6666C12.5556 10.6666 13.0278 10.8611 13.4167 11.25C13.8056 11.6389 14 12.1111 14 12.6666C14 13.2222 13.8056 13.6944 13.4167 14.0833C13.0278 14.4722 12.5556 14.6666 12 14.6666ZM12 3.99998C12.1889 3.99998 12.3473 3.93598 12.4753 3.80798C12.6033 3.67998 12.6671 3.52176 12.6667 3.33331C12.6667 3.14442 12.6027 2.98598 12.4747 2.85798C12.3467 2.72998 12.1884 2.6662 12 2.66665C11.8111 2.66665 11.6527 2.73065 11.5247 2.85865C11.3967 2.98665 11.3329 3.14487 11.3333 3.33331C11.3333 3.5222 11.3973 3.68065 11.5253 3.80865C11.6533 3.93665 11.8116 4.00042 12 3.99998ZM4 8.66665C4.18889 8.66665 4.34733 8.60265 4.47533 8.47465C4.60333 8.34665 4.66711 8.18842 4.66667 7.99998C4.66667 7.81109 4.60267 7.65265 4.47467 7.52465C4.34667 7.39665 4.18844 7.33287 4 7.33331C3.81111 7.33331 3.65267 7.39731 3.52467 7.52531C3.39667 7.65331 3.33289 7.81154 3.33333 7.99998C3.33333 8.18887 3.39733 8.34731 3.52533 8.47531C3.65333 8.60331 3.81156 8.66709 4 8.66665ZM12 13.3333C12.1889 13.3333 12.3473 13.2693 12.4753 13.1413C12.6033 13.0133 12.6671 12.8551 12.6667 12.6666C12.6667 12.4778 12.6027 12.3193 12.4747 12.1913C12.3467 12.0633 12.1884 11.9995 12 12C11.8111 12 11.6527 12.064 11.5247 12.192C11.3967 12.32 11.3329 12.4782 11.3333 12.6666C11.3333 12.8555 11.3973 13.014 11.5253 13.142C11.6533 13.27 11.8116 13.3338 12 13.3333Z"
                  fill="#98A2B3"
                />
              </svg>
              <button
                onClick={() => window.open(`${place.place_url}`)}
                className="bg-gray-50 ml-2 text-[14px] text-gray-500 rounded-2xl cursor-pointer"
                style={{ padding: "8px 10px" }}
              >
                상세보기
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MarkerLists;
