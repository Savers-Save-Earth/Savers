import React, { useEffect } from "react";
import { useState } from "react";
import { BadgeType, MyBadgeProps } from "@/types/types";
import Image from "next/image";

const Badges = ({ badgeData, missionDone }: MyBadgeProps) => {
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [badgesByMissionCount, setBadgesByMissionCount] = useState<number>(0);
  // const [showExplain, setShowExplain] = useState<boolean>(false)
  const [badgeClickStates, setBadgeClickStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (badgeData && missionDone) {
      setBadges(badgeData);
      setBadgesByMissionCount(missionDone.length);
    } else {
      setBadges([]);
      setBadgesByMissionCount(0);
    }
  }, [badgeData, missionDone]);

  // 처음 데이터 로드할 때 badgeList 작성
  const initializeBadgeList = () => {
    const shareBadge = badges.find((item) => item.badge_title === "share");
    const threeShareBadge =
      badges.filter((item) => item.badge_title === "share").length >= 30;

    const likeBadge = badges.find((item) => item.badge_title === "like");
    const threeLikeBadge =
      badges.filter((item) => item.badge_title === "like").length >= 30;

    const firstMission = badgesByMissionCount >= 1;
    const bronzeTrophy = badgesByMissionCount >= 10;
    const silverTrophy = badgesByMissionCount >= 20;
    const goldTrophy = badgesByMissionCount >= 30;

    const badgeList = [
      {
        name: "새싹 세이버",
        clear: badges,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/01sproutsaver.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/01falsesproutsaver.png",
        content: "Savers 회원님께 이 배지를 드려요!",
        borderColor: "border-[#E4FAD2]"
      },
      {
        name: "나눔꾼",
        clear: shareBadge,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/02sharer.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/02falsesharer.png",
        content: "글 공유 1회 완료시 획득할 수 있어요",
        borderColor: "border-[#DDE8FF]"
      },
      {
        name: "공.유",
        clear: threeShareBadge,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/03gongyou.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/03falsegongyou.png",
        content: "글 공유 3회 완료시 획득할 수 있어요",
        borderColor: "border-[#FBF2A3]"
      },
      {
        name: "사랑꾼",
        clear: likeBadge,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/04lover.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/04falselover.png",
        content: "친환경제품 좋아요 클릭시 획득할 수 있어요",
        borderColor: "border-[#FFE7E4]"
      },
      {
        name: "찐 사랑꾼",
        clear: threeLikeBadge,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/05reallover.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/05falsereallover.png",
        content: "친환경제품 좋아요 3회 클릭시 획득할 수 있어요",
        borderColor: "border-[#FFE7E4]"
      },
      {
        name: "첫 미션",
        clear: firstMission,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/06firstmission.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/06falsefirstmission.png",
        content: "미션 클리어 1회 달성시 획득할 수 있어요.",
        borderColor: "border-[#E4FAD2]"
      },
      {
        name: "미션 헌터",
        clear: bronzeTrophy,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/07missionhunter.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/07falsemissionhunter.png",
        content: "미션 클리어 10회 달성시 획득할 수 있어요.",
        borderColor: "border-[#FFE4C1]"
      },
      {
        name: "미션 프로",
        clear: silverTrophy,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/08missionpro.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/08falsemissionpro.png",
        content: "미션 클리어 20회 달성시 획득할 수 있어요.",
        borderColor: "border-[#ECECEC]"
      },
      {
        name: "미션 마스터",
        clear: goldTrophy,
        image:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/true/09missionmaster.png",
        defaultImage:
          "https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/badge/falsetemp/09falsemissionmaster.png",
        content: "미션 클리어 30회 달성시 획득할 수 있어요.",
        borderColor: "border-[##FDF0B9]"
      },
    ];
    return badgeList;
  };

  const badgeList = initializeBadgeList();

  const handleBadgeClick = (badgeName: string) => {
    // 해당 뱃지의 클릭 상태를 토글
    setBadgeClickStates((prevState) => ({
      [badgeName]: !prevState[badgeName],
    }));
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full h-full">
      {badgeList.map((badge, i) => (
        <div className="flex flex-col items-center gap-2 relative" key={i}>
          
          <div className="w-[88px] h-[88px] rounded-full">
            {badge.clear ? (
              <Image
                alt={badge.name}
                src={badge.image}
                width={88}
                height={88}
                quality={100}
                onClick={() => handleBadgeClick(badge.name)}
              />
            ) : (
              <Image
                alt={badge.name}
                src={badge.defaultImage}
                width={88}
                height={88}
                quality={100}
                onClick={() => handleBadgeClick(badge.name)}
              />
            )}
            <div
              className={`absolute top-0 ${i%3 === 2 ? "right-0" : ""} z-[2] w-[200px] h-[280px] border-4 ${badge.borderColor} bg-white rounded-xl items-center justify-center transition-opacity
              ${
                badgeClickStates[badge.name] ? "flex flex-col opacity-100" : "hidden opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute top-[20px] right-[20px] hover:scale-[120%] cursor-pointer"
                onClick={() => handleBadgeClick(badge.name)}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29294C17.6834 4.90242 18.3166 4.90242 18.7071 5.29294C19.0976 5.68347 19.0976 6.31663 18.7071 6.70716L13.4142 12L18.7071 17.2928C19.0976 17.6834 19.0976 18.3165 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                  fill="#98A2B3"
                />
              </svg>
              <div className="flex flex-col w-[90px] h-[168px] items-center justify-center gap-6">
                <Image
                  alt={badge.name}
                  src={badge.image}
                  width={88}
                  height={88}
                  quality={100}
                />
                <div className="flex flex-col items-center">
                  <p className="text-gray-700 font-bold">{badge.name}</p>
                  <p className="text-gray-400 text-xs">{badge.content}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="badge-text">{badge.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Badges;
