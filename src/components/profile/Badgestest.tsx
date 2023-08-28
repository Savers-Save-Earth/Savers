import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";

interface Badge {
  id: number;
  user_id: string;
  badge_title: string;
}

interface Badge2 {
  id: number;
  user_uid: string;
  smallCategory: string;
}

const BadgesTest = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const params = useParams();
  const searchId = decodeURIComponent(`${params.id}`);
  const [badges2, setBadges2] = useState<Badge2[]>([]);

  const fetchBadges = async (user: any) => {
    console.log(user[0]);
    const { data: badgeData } = await supabase
      .from("badge")
      .select()
      .eq("user_id", user[0]?.uid);

    if (badgeData !== null) {
      setBadges(badgeData);
    }
  };

  const fetchBadgesByMission = async (user: any) => {
    console.log("미션의 유저===>",user[0]);
    const { data: badgeData2 } = await supabase
      .from("missionList")
      .select()
      .eq("user_uid", user[0]?.uid)
      .eq("doingYn", false)
    console.log("badgeData2====>",badgeData2)
    if (badgeData2 !== null) {
      setBadges2(badgeData2);
    }
  };

  const fetchUser = async () => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("nickname", searchId)
      console.log("data==>",data);
    fetchBadges(data);
    fetchBadgesByMission(data)
  };

  const shareBadge = badges.find((item) => item.badge_title === "share");
  const threeShareBadge =
    badges.filter((item) => item.badge_title === "share").length >= 3;

  const likeBadge = badges.find((item) => item.badge_title === "like");
  const threeLikeBadge =
    badges.filter((item) => item.badge_title === "like").length >= 3;

  const recipePostBadge = badges2.find((item) => item.smallCategory === "레시피")
  console.log("recipePostBadge==>",recipePostBadge)
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 w-full h-full">
      <div className="bg-gray-200 p-4">[새싹 세이버] 회원가입시 받는 배지</div>
      <div className="bg-gray-200 p-4">
        {shareBadge
          ? "[나눔꾼] 물건 공유하기 배지"
          : "아직 공유하기 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
        {threeShareBadge
          ? "[나눔꾼3] 물건 세번 공유하기 배지"
          : "아직 세번 공유하기 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
        {likeBadge
          ? "[사랑꾼] 좋아요 1회 배지"
          : "좋아요 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
      {threeLikeBadge
          ? "[사랑꾼] 좋아요 3회 배지"
          : "좋아요 3회 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
      {recipePostBadge
          ? (
            <>
            <img src="https://img.freepik.com/premium-vector/cute-panda-is-writing-animal-education-icon-concept_493206-152.jpg?w=2000" />
            {/* <p>[애기 쉐프] 레시피 1회 작성 배지</p> */}
            </>
            )
          : (<p>"아직 애기 쉐프 배지를 획득하지 못했습니다."</p>)}
      </div>
      <div className="bg-gray-200 p-4">
      {threeLikeBadge
          ? "[사랑꾼] 좋아요 3회 배지"
          : "좋아요 3회 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
      {threeLikeBadge
          ? "[사랑꾼] 좋아요 3회 배지"
          : "좋아요 3회 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
      {threeLikeBadge
          ? "[사랑꾼] 좋아요 3회 배지"
          : "좋아요 3회 배지를 획득하지 못했습니다."}
      </div>
    </div>
  );
};

export default BadgesTest;
