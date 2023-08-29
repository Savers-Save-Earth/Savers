"use client";
import supabase from "@/libs/supabase";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

interface MarkList {
  id: number;
  restaurant_name: string;
  restaurant_address: string;
}

const MarkerLists = ({ markerList }) => {
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

        alert("북마크가 해제되었습니다.");
      } else {
        const { error: addMarkListError } = await supabase
          .from("like_restaurant")
          .insert({
            restaurant_category: category,
            restaurant_address: address,
            restaurant_name: name,
            user_id: user.id,
          });
        alert("북마크 되었습니다.");
      }
    } else {
      alert("로그인 후 사용해주세요.");
      return;
    }
  };

  useEffect(() => {
    fetchUser();
    fetchMarkList();
  }, []);

  return (
    <div>
      <h2>마커 리스트 컴포넌트</h2>
      <ul>
        {/* markerList 정보를 사용하여 리스트를 렌더링합니다 */}
        {markerList.map((place: any, index: number) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              width: "50%",
              borderRadius: "7px",
            }}
          >
            <p>{place.category_name}</p>
            <p>{place.place_name}</p>
            <p>{place.address_name}</p>
            {/* <p>📌 {bookmarkHandler(place.place_name)}</p> */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addMarkList(
                  place.category_name,
                  place.place_name,
                  place.address_name,
                );
                fetchMarkList();
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                size="xs"
                style={{ color: "#000000", marginRight: "5px" }}
              />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MarkerLists;