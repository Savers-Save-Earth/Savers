"use client";
import supabase from "@/libs/supabase";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import { Database } from "@/types/supabase";

interface MarkList {
  id: number;
  restaurant_name: string;
  restaurant_address: string;
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
    console.log(existingMarkedData);
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
                  fetchMarkList();
                }}
                className="mr-3"
              >
                <img
                  src="/assets/like.png"
                  className="inline-block mr-0.5"
                  style={{ height: "auto", verticalAlign: "middle" }}
                  alt="Icon"
                />
                <span className="text-gray-300">
                  {bookmarkHandler(place.place_name)}
                </span>
              </button>
              <img
                src="/assets/share.png"
                className="border border-gray-300 p-2 rounded-full inline-block cursor-pointer"
                onClick={() => shareBtn(place)}
              />
              <button
                onClick={() => window.open(`${place.place_url}`)}
                className="px-[8px] py-[10px] bg-gray-50 ml-2 text-[14px] text-gray-500 rounded-2xl cursor-pointer"
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
