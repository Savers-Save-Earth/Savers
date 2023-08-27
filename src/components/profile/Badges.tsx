import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";

interface Badge {
  id: number;
  user_id: string;
  badge_title: string;
}

const Badges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const params = useParams();
  const searchId = decodeURIComponent(`${params.id}`);
  console.log(searchId);

  const fetchBadges = async (user: any) => {
    console.log(user[0]);
    const { data: badgeData } = await supabase
      .from("badge")
      .select()
      .eq("user_id", user[0]?.uid);

    console.log(badgeData);
    if (badgeData !== null) {
      console.log(badgeData);
      setBadges(badgeData);
    }
  };

  const fetchUser = async () => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("nickname", searchId);

    fetchBadges(data);
  };

  const shareBadge = badges.find((item) => item.badge_title === "share");
  const threeShareBadge =
    badges.filter((item) => item.badge_title === "share").length >= 3;

  const likeBadge = badges.find((item) => item.badge_title === "like");
  const threeLikeBadge =
    badges.filter((item) => item.badge_title === "like").length >= 3;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <p>[새싹 세이버] 회원가입시 받는 배지</p>
      <p>
        {shareBadge
          ? "[나눔꾼] 물건 공유하기 배지"
          : "아직 공유하기 배지를 획득하지 못했습니다."}
      </p>
      <p>
        {threeShareBadge
          ? "[나눔꾼3] 물건 세번 공유하기 배지"
          : "아직 세번 공유하기 배지를 획득하지 못했습니다."}
      </p>
      <p>
        {likeBadge
          ? "[사랑꾼] 좋아요 1회 배지"
          : "좋아요 배지를 획득하지 못했습니다."}
      </p>
      <p>
        {threeLikeBadge
          ? "[사랑꾼] 좋아요 3회 배지"
          : "좋아요 3회 배지를 획득하지 못했습니다."}
      </p>
    </div>
  );
};

export default Badges;
