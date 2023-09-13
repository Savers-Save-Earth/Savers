import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import { BadgeType, MyBadgeProps } from "@/types/types";
import Image from "next/image";

const Badges = ({ badgeData, missionDone }: MyBadgeProps) => {
  const [badges, setBadges] = useState<BadgeType[]>([]);

  const [badgesByMissionCount, setBadgesByMissionCount] = useState<number>(0);

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

// Initialize badgeList when you have the necessary data
const initializeBadgeList = () => {
  const shareBadge = badges.find((item) => item.badge_title === "share");
  const threeShareBadge =
    badges.filter((item) => item.badge_title === "share").length >= 30;

  const likeBadge = badges.find((item) => item.badge_title === "like");
  const threeLikeBadge =
    badges.filter((item) => item.badge_title === "like").length >= 30;

  const bronzeTrophy = badgesByMissionCount >= 10;
  const silverTrophy = badgesByMissionCount >= 20;
  const goldTrophy = badgesByMissionCount >= 30;

  console.log("shareBadge==>",shareBadge)
  console.log("threeShareBadge==>",threeShareBadge)
  const badgeList = [
    {
      name: "새싹 세이버",
      clear: badges,
      image: "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/01sproutsaver.png",
      defaultImage: "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/01falsesproutsaver.png",
    },
    {
      name: "나눔꾼",
      clear: shareBadge,
      image: "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/02sharer.png",
      defaultImage: "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/02falsesharer.png",
    },
    {
      name: "공.유",
      clear: threeShareBadge,
      image: "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/03gongyou.png",
      defaultImage: "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/03falsegongyou.png",
    },
    {
      name: "사랑꾼",
      clear: likeBadge,
      image: "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/04lover.png",
      defaultImage: "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/04falselover.png",
    },
  ];
  console.log("badgeList==>",badgeList)
  return badgeList;
};

// Call the function to initialize badgeList
const badgeList = initializeBadgeList();
console.log("badgeLis22t==>",badgeList)

  // const shareBadge = badges.find((item) => item.badge_title === "share");
  // const threeShareBadge =
  //   badges.filter((item) => item.badge_title === "share").length >= 30;

  const likeBadge = badges.find((item) => item.badge_title === "like");
  const threeLikeBadge =
    badges.filter((item) => item.badge_title === "like").length >= 30;

  //  const bronzeTrophy
  const firstMission = badgesByMissionCount >= 1;
  //아래 뱃지 얻는 조건은 추후에 수정해야 함.
  const bronzeTrophy = badgesByMissionCount >= 10;
  const silverTrophy = badgesByMissionCount >= 20;
  const goldTrophy = badgesByMissionCount >= 30;

//  const badgeList = [
//   {
//     name : "새싹 세이버",
//     clear : badges, 
//     image : "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/01sproutsaver.png", 
//     defaultImage : "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/01falsesproutsaver.png",
//   },
//   {
//     name : "나눔꾼",
//     clear : shareBadge, 
//     image : "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/02falsesharer.png", 
//     defaultImage : "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/02falsesharer.png",
//   },
//   {
//     name : "공.유",
//     clear : threeShareBadge, 
//     image : "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/03gongyou.png", 
//     defaultImage : "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/03falsegongyou.png",
//   },
//   {
//     name : "사랑꾼",
//     clear : likeBadge, 
//     image : "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/04falselover.png", 
//     defaultImage : "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/04falselover.png",
//   }
//  ]
//  console.log("badges",badges)
//  console.log("shareBadge",shareBadge)
//  console.log("threeShareBadge",threeShareBadge)
  return (
    // <div className="grid grid-cols-3 gap-4 w-full h-full">
    // <div className="flex flex-col w-[100%] items-start gap-[30px] ">
    <div className="flex flex-col w-[100%] items-start gap-[30px] ">
      <div className="flex justify-evenly items-start self-stretch">
        {badgeList.map((badge) => (
          <div className="flex flex-col items-center gap-2">
          {badge.clear ? (
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src={badge.image}
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              
          ) : (
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src={badge.defaultImage}
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              
          )}
          <p className="badge-text">{badge.name}!!</p>
        </div>
        ))}
      </div>
      <div className="flex justify-evenly items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
          {likeBadge ? (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/04lover.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
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
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/04falselover.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">사랑꾼</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {threeLikeBadge ? (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/05reallover.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">찐 사랑꾼</p>
            </>
          ) : (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/05falsereallover.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">찐 사랑꾼</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {firstMission ? (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/06firstmission.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text">첫 미션</p>
            </>
          ) : (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/06falsefirstmission.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text">첫 미션</p>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-evenly items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
          {bronzeTrophy ? (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/07falsemissionhunter.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">미션 헌터</p>
            </>
          ) : (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/07falsemissionhunter.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">미션 헌터</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {silverTrophy ? (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/08missionpro.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">미션 프로</p>
            </>
          ) : (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/08falsemissionpro.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">미션 프로</p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {goldTrophy ? (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/09missionmaster.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">미션 마스터</p>
            </>
          ) : (
            <>
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden relative">
                <Image
                  alt="no image"
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/09falsemissionmaster.png"
                  width={88}
                  height={88}
                  quality={100}
                />
              </div>
              <p className="badge-text ">미션 마스터</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Badges;
