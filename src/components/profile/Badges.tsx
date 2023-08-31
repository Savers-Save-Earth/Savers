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
        <div className="flex flex-col items-center gap-2">
          {bronzeTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/true.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS90cnVlLnN2ZyIsImlhdCI6MTY5MzQ1NjI2NywiZXhwIjoxNjk2MDQ4MjY3fQ.VOB1STTxO1I0y6VAbEiTtaDVplvFiUOYyVt6-cLW_Jg&t=2023-08-31T04%3A31%3A05.175Z"
              />
              <p className="badge-text">
                새싹 세이버
              </p>
            </>
          ) : (
            <p>"아직 [새싹 세이버] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {silverTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/02sharer.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wMnNoYXJlci5zdmciLCJpYXQiOjE2OTM0NTY1MjksImV4cCI6MTY5NjA0ODUyOX0.KfrCBVAHtMxjhskL_Dv4PbijPkbczdS0R2pVaFLOhJI&t=2023-08-31T04%3A35%3A27.744Z"
              />
              <p className="badge-text">
                나눔꾼
              </p>
            </>
          ) : (
            <p>"아직 [나눔꾼] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {goldTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/03gongyou.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wM2dvbmd5b3Uuc3ZnIiwiaWF0IjoxNjkzNDU2NTYwLCJleHAiOjE2OTYwNDg1NjB9.h3cJcTw5LDX9yOMI4ZV8kbsVC4BWGW3BF5B7p34KzuU&t=2023-08-31T04%3A35%3A58.235Z"
              />
              <p className="badge-text">
                공.유
              </p>
            </>
          ) : (
            <p>"아직 [공.유] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
          {bronzeTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/04lover.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wNGxvdmVyLnN2ZyIsImlhdCI6MTY5MzQ1NjU3NSwiZXhwIjoxNjk2MDQ4NTc1fQ.mItBURw24ysbOAl55u0E0nhKjZBXJyglyMolKoVp_yk&t=2023-08-31T04%3A36%3A14.025Z"
              />
              <p className="badge-text ">
                사랑꾼
              </p>
            </>
          ) : (
            <p>"아직 [사랑꾼] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {silverTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/05reallover.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wNXJlYWxsb3Zlci5zdmciLCJpYXQiOjE2OTM0NTY1ODgsImV4cCI6MTY5NjA0ODU4OH0.d488tll3m7OBYfVScktw9ZokucBxYBO3xcqDFncIjBQ&t=2023-08-31T04%3A36%3A27.059Z"
              />
              <p className="badge-text ">
                찐 사랑꾼
              </p>
            </>
          ) : (
            <p>"아직 [찐 사랑꾼] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {goldTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/06fisrtmission.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wNmZpc3J0bWlzc2lvbi5zdmciLCJpYXQiOjE2OTM0NTY2MDIsImV4cCI6MTY5NjA0ODYwMn0.svP1Nr8pLdL6eQwsVcQaARHlf4Mcyr0Fw39M48qD5kE&t=2023-08-31T04%3A36%3A40.254Z"
              />
              <p className="badge-text">
                첫 미션
              </p>
            </>
          ) : (
            <p>"아직 [첫 미션] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
          {bronzeTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/07missionhunter.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wN21pc3Npb25odW50ZXIuc3ZnIiwiaWF0IjoxNjkzNDU2NjE4LCJleHAiOjE2OTYwNDg2MTh9.yoiQ9I0Vy_o7OapvJVN6_n3DfuwedBVijFfj24pn0yc&t=2023-08-31T04%3A36%3A56.455Z"
              />
              <p className="badge-text ">
                미션 헌터
              </p>
            </>
          ) : (
            <p>"아직 [미션 헌터] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {silverTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/08missionpro.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wOG1pc3Npb25wcm8uc3ZnIiwiaWF0IjoxNjkzNDU2NjI4LCJleHAiOjE2OTYwNDg2Mjh9.h8E9dRrrfCkj0cnG2xuiZArTwL6AMQNm4U6vcZ3ehQc&t=2023-08-31T04%3A37%3A06.666Z"
              />
              <p className="badge-text ">
                미션 프로
              </p>
            </>
          ) : (
            <p>"아직 [미션 프로] 배지를 획득하지 못했습니다."</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {goldTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/09missionmaster.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wOW1pc3Npb25tYXN0ZXIuc3ZnIiwiaWF0IjoxNjkzNDU2NjM3LCJleHAiOjE2OTYwNDg2Mzd9.CCH2fG720Ue6L7_2SkSimaR9gcN1g4BlH8pTzCp_V7Q&t=2023-08-31T04%3A37%3A15.569Z"
              />
              <p className="badge-text ">
                미션 마스터
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
