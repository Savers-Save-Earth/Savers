"use client";

import { convertDate } from "@/libs/util";
import { Database } from "@/types/supabase";
import React from "react";

import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { fetchMissionDoing } from "@/api/profile/fetchProfileData";
import NoListToShown from "@/components/profile/NoListShown";

type MissionDoingProp = Database["public"]["Tables"]["missionList"]["Row"];

const MissionDoing = ({ params }: { params: { id: string } }) => {
  const currentDate = convertDate(new Date());
  const searchId = params.id;

  const { data: missionDoing, isLoading } = useQuery<any>(
    ["fetchMissionDoing", searchId],
    () => fetchMissionDoing(searchId, currentDate),
    { cacheTime: 6000 },
  );
  if (isLoading) return <Loading />;

  if (missionDoing && missionDoing.length < 1) {
    return <NoListToShown listProp={"noMissionDoing"} />;
  }

  return (
    <div className="flex justify-center items-center gap-x-4 text-gray-800  w-full">
      {missionDoing?.map((mission: any) => {
        return (
          <div
            className="py-6 px-4 flex flex-col justify-between items-center w-[25%] h-[300px] rounded-2xl break-words hover:scale-110 hover:duration-500 bg-[#F3FFEA]"
            key={mission.id}
          >
            <div className="flex flex-col gap-3 items-start self-stretch">
              <h1 className="text-[24px] leading-[31px] font-semibold text-[#4DAB00]">
                {mission.title}
              </h1>

              <div className="flex flex-col items-start gap-2 self-stretch ">
                <div className="min-h-[127px] flex py-4 px-2 flex-col justify-between items-start gap-2 self-stretch bg-[#E8FFD4] rounded-2xl">
                  <p className="text-[14px] font-medium text-[#5FD100]">
                    {mission.content}
                  </p>
                  <p>
                    {mission &&
                      mission.createdAt &&
                      mission.createdAt.replaceAll("-", ".")}
                    까지
                  </p>
                </div>
              </div>
            </div>

            <button
              className="flex py-2 px-[10px] justify-center items-center gap-[10px] bg-[#5FD100] rounded-2xl text-[#FCFCFD]"
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

export default MissionDoing;
