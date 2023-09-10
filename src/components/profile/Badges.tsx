import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import { BadgeType, MyBadgeProps } from "@/types/types";
import Image from "next/image";

const Badges = ({ badgeData, missionDone }: MyBadgeProps) => {
  const [badges, setBadges] = useState<BadgeType[]>([]);
  // const searchId = decodeURIComponent(`${params.id}`);

  const [badgesByMissionCount, setBadgesByMissionCount] = useState<number>(0);

  // const fetchBadges = async (user: any) => {

  //   const { data: badgeData } = await supabase
  //     .from("badge")
  //     .select()
  //     .eq("user_id", user[0]?.uid);

  //   if (badgeData !== null) {
  //     setBadges(badgeData);
  //   }
  // };

  useEffect(() => {
    // fetchMissionList();
    if (badgeData && missionDone) {
      setBadges(badgeData);
      setBadgesByMissionCount(missionDone.length);
    } else {
      setBadges([]);
      setBadgesByMissionCount(0);
    }
  }, [badgeData, missionDone]);
  ///===================👇동준작업👇=========================================================
  // const fetchBadgesByMission = async (user: any) => {

  //   const { data: badgeData2, count } = await supabase
  //     .from("missionList")
  //     .select("*", { count: "exact" })
  //     .eq("user_uid", user[0]?.uid)
  //     .eq("doingYn", false);

  //   if (badgeData2 !== null && count !== null) {
  //     setBadges(badgeData2);
  //     setBadgesByMissionCount(count);
  //   }
  // };
  ///===================👆동준작업👆=========================================================
  // const fetchUser = async () => {
  //   const { data } = await supabase
  //     .from("user")
  //     .select()
  //     .eq("uid", searchId);

  //   // fetchBadges(data);
  //   fetchBadgesByMission(data);
  // };

  const shareBadge = badges.find((item) => item.badge_title === "share");
  const threeShareBadge =
    badges.filter((item) => item.badge_title === "share").length >= 30;

  const likeBadge = badges.find((item) => item.badge_title === "like");
  const threeLikeBadge =
    badges.filter((item) => item.badge_title === "like").length >= 30;

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
  const bronzeTrophy = badgesByMissionCount >= 10;
  const silverTrophy = badgesByMissionCount >= 20;
  const goldTrophy = badgesByMissionCount >= 30;
  ///===================👆동준작업👆=========================================================
  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    // <div className="grid grid-cols-3 gap-4 w-full h-full">
    <div className="flex flex-col w-[100%] items-start gap-[30px] ">
      <div className="flex justify-evenly items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
          {badges ? (
            <>
              {/* <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/01sproutsaver.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wMXNwcm91dHNhdmVyLnN2ZyIsImlhdCI6MTY5MzQ2NTYzNywiZXhwIjoxNjk2MDU3NjM3fQ.y9emdOUGzuWiaGTUZDAorTZa6-ezqX_VqwXMHbZgspY&t=2023-08-31T07%3A07%3A17.651Z"
              /> */}
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/01sproutsaver.svg"
                width={88}
                height={88}
              />
              <p className="badge-text">새싹 세이버</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/01falsesproutsaver.svg"
                width={88}
                height={88}
                
              />
              <p className="badge-text">새싹 세이버</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {shareBadge ? (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/02sharer.svg"
                width={88}
                height={88}
              />
              <p className="badge-text">나눔꾼</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/02falsesharer.svg"
                width={88}
                height={88}
              />
              <p className="badge-text">나눔꾼</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {threeShareBadge ? (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/03gongyou.svg"
                width={88}
                height={88}
              />
              <p className="badge-text">공.유</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/03falsegongyou.svg"
                width={88}
                height={88}
              />
              <p className="badge-text">공.유</p>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-evenly items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
          {likeBadge ? (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/04lover.svg"
                width={88}
                height={88}
              />
              {/* <Image
                alt="no image"
                src="https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-cheese-pizza_9.jpg"
                width={88}
                height={88}
              /> */}
              <p className="badge-text ">사랑꾼</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/04falselover.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">사랑꾼</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {threeLikeBadge ? (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/05reallover.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">찐 사랑꾼</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/05falsereallover.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">찐 사랑꾼</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {firstMission ? (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/06fisrtmission.svg"
                width={88}
                height={88}
              />
              <p className="badge-text">첫 미션</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/06falsefirstmission.svg"
                width={88}
                height={88}
              />
              <p className="badge-text">첫 미션</p>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-evenly items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
          {bronzeTrophy ? (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/07missionhunter.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">미션 헌터</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/07falsemissionhunter.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">미션 헌터</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {silverTrophy ? (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/08missionpro.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">미션 프로</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/08falsefalsemissionpro.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">미션 프로</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {goldTrophy ? (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/09missionmaster.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">미션 마스터</p>
            </>
          ) : (
            <>
              <Image
                alt="no image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/false/09falsefalsemissionmaster.svg"
                width={88}
                height={88}
              />
              <p className="badge-text ">미션 마스터</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Badges;
