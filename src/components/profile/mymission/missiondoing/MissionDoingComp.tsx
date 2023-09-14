"use client";

import { convertDate } from "@/libs/util";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMissionDoing } from "@/api/profile/fetchProfileData";
import NoListToShown from "@/components/profile/NoListShown";
import LoadingMission from "@/components/profile/ui/LoadingMission";
import { MissionListType } from "@/types/types";
import Image from "next/image";

const MissionDoingComp = ({ id }: { id: string }) => {
  const currentDate = convertDate(new Date());
  const searchId = id;
  const { data: missionDoing, isLoading } = useQuery(
    ["missionList", searchId],
    () => fetchMissionDoing(searchId, currentDate),
    { cacheTime: 6000 },
  );
  if (isLoading) return <LoadingMission />;

  if (missionDoing && missionDoing.length < 1) {
    return <NoListToShown listProp={"noMissionDoing"} />;
  }
  return (
    <div className="grid md:grid-cols-4 md:gap-10 grid-cols-2 gap-3 place-items-center">
      {missionDoing?.map((mission: MissionListType) => {
        return (
          <div
            className="relative py-2 sm:py-6 px-4 flex flex-col min-h-[10rem] sm:min-h-[0] justify-between items-center w-[8rem] h-[13rem] sm:w-[180px] sm:h-[300px] rounded-2xl break-words hover:scale-110 hover:duration-500 bg-[#F3FFEA]"
            key={mission.id}
          >
            <div className="flex flex-col gap-2 items-start self-stretch">
              <div className="relative min-w-[32px] min-h-[32px] sm:min-w-[64px] sm:min-h-[64px]">
                <Image
                  src={mission.icon}
                  alt="진행미션카드 아이콘"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <h1 className="text-[1rem] sm:text-[24px] sm:leading-[29px] font-semibold text-[#4DAB00]">
                {mission.title}
              </h1>

              <div className="flex flex-col items-start gap-1 self-stretch ">
                <div className="w-full h-full sm:min-w-[121px] sm:min-h-[110px] flex py-2 px-2 flex-col justify-between items-start self-stretch bg-[#E8FFD4] rounded-2xl">
                  <p className="text-[0.5rem] sm:text-[14px] font-medium text-[#5FD100]">
                    {mission.content}
                  </p>
                  <p className="text-gray-500 text-[0.5rem] sm:text-[14px]">
                    {mission &&
                      mission.createdAt &&
                      mission.createdAt.replaceAll("-", ".")}
                    까지
                  </p>
                </div>
              </div>
            </div>

            <button
              className="absolute bottom-3 text-xs sm:text-base py-1 px-1 sm:py-1.5 sm:px-[10px] justify-center items-center gap-[10px] bg-[#5FD100] rounded-2xl text-[#FCFCFD]"
              onClick={() =>
                mission.bigCategory === "글쓰기"
                  ? window.open("/community")
                  : window.open("/product")
              }
            >
              미션하러 가기
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MissionDoingComp;
