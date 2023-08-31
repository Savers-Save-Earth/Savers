import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";

interface Badge {
  id: number;
  user_id: string;
  badge_title: string;
}

interface BadgeByMission {
  id: number;
  user_uid: string;
  bigCategory: string;
  smallCategory: string;
}

const Badges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const params = useParams();
  const searchId = decodeURIComponent(`${params.id}`);

  const [badgeByMission, setBadgeByMission] = useState<BadgeByMission[]>([]);
  const [badgesByMissionCount, setBadgesByMissionCount] = useState<number>(0);

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
  ///===================👇동준작업👇=========================================================
  const fetchBadgesByMission = async (user: any) => {
    console.log("미션의 유저===>", user[0]);
    const { data: badgeData2, count } = await supabase
      .from("missionList")
      .select("*", { count: "exact" })
      .eq("user_uid", user[0]?.uid)
      .eq("doingYn", false);
    console.log("badgeData2====>", badgeData2);
    if (badgeData2 !== null && count !== null) {
      setBadgeByMission(badgeData2);
      setBadgesByMissionCount(count);
    }
  };
  ///===================👆동준작업👆=========================================================
  const fetchUser = async () => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("nickname", searchId);

    fetchBadges(data);
    fetchBadgesByMission(data);
  };

  const shareBadge = badges.find((item) => item.badge_title === "share");
  const threeShareBadge =
    badges.filter((item) => item.badge_title === "share").length >= 3;

  const likeBadge = badges.find((item) => item.badge_title === "like");
  const threeLikeBadge =
    badges.filter((item) => item.badge_title === "like").length >= 3;

  ///===================👇동준작업👇=========================================================
  /*
  const recipePostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "레시피")
  const restaurantPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "식당")
  const productPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "제품")
  const ohjiwanPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "오지완")
  */
  //  const bronzeTrophy
  const firstMission = badgesByMissionCount >= 1;
  //아래 뱃지 얻는 조건은 추후에 수정해야 함.
  const bronzeTrophy = badgesByMissionCount >= 1;
  const silverTrophy = badgesByMissionCount >= 2;
  const goldTrophy = badgesByMissionCount >= 3;
  ///===================👆동준작업👆=========================================================
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    // <div className="grid grid-cols-3 gap-4 w-full h-full">
    <div className="flex flex-col w-[317.5px] items-start gap-[30px] ">
      <div className="flex justify-between items-start self-stretch">
        <div className="bg-gray-200 p-4">
          [새싹 세이버] 회원가입시 받는 배지
        </div>
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
      </div>

      <div className="flex justify-between items-start self-stretch">
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
        <div className="flex flex-col items-center gap-2">
          {firstMission ? (
            <>
              <img
                className="w-[88px] h-[88px]"
                src="https://img.myloview.com/posters/cute-earth-character-green-and-blue-planet-save-earth-day-funny-emoticon-in-flat-style-cartoon-emoji-vector-illustration-400-204245384.jpg"
              />
              <p>[첫 미션 클리어]</p>
            </>
          ) : (
            <p>"아직 [첫 미션 클리어] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-start self-stretch">
        <div className="border-2 border-solid border-black flex flex-col items-center gap-2">
          {bronzeTrophy ? (
            <>
              <img
                className="w-[88px] h-[88px]"
                src="https://static.vecteezy.com/system/resources/previews/010/976/286/original/bronze-cup-3d-winner-award-3d-place-minimal-bronze-winners-stars-on-podium-champion-award-ceremony-concept-in-cartoon-style-3d-trophy-render-isolated-on-white-background-game-or-education-free-vector.jpg"
              />
              <p className="text-gray-500 text-[16px] font-normal leading-4 ">
                [미션 헌터]
              </p>
            </>
          ) : (
            <p>"아직 [미션 헌터] 배지를 획득하지 못했습니다."</p>
          )}
        </div>

        <div className="border-2 border-solid border-black flex flex-col items-center gap-2">
          {silverTrophy ? (
            <>
              <img
                className="w-[88px] h-[88px]"
                src="https://static.vecteezy.com/system/resources/previews/010/976/282/non_2x/silver-cup-3d-winner-award-2nd-place-minimal-silver-winners-stars-on-podium-champion-award-ceremony-concept-in-cartoon-style-3d-trophy-render-isolated-on-white-background-game-or-education-free-vector.jpg"
              />
              <p className="text-gray-500 text-[16px] font-normal leading-4 ">
                [미션 프로]
              </p>
            </>
          ) : (
            <p>"아직 [미션 프로] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
        <div className="border-2 border-solid border-black flex flex-col items-center gap-2">
          {goldTrophy ? (
            <>
              <img
                className="w-[88px] h-[88px]"
                src="https://static.vecteezy.com/system/resources/previews/010/976/289/non_2x/golden-cup-3d-winner-award-1st-place-minimal-gold-winners-stars-on-podium-champion-award-ceremony-concept-in-cartoon-style-3d-trophy-render-isolated-on-white-background-game-or-education-free-vector.jpg"
              />
              <p className="text-gray-500 text-[16px] font-normal leading-4 ">
                [미션 마스터]
              </p>
            </>
          ) : (
            <p>"아직 [미션 마스터] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Badges;
