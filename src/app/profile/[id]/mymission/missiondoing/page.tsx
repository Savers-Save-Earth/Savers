"use client";

import supabase from "@/libs/supabase";
import { convertDate } from "@/libs/util";
import { Database } from "@/types/supabase";
import React, { useEffect, useState } from "react";

type MissionDoingProp = Database["public"]["Tables"]["missionList"]["Row"];

const MissionDoing = ({ params }: { params: { id: string } }) => {
  const [dailyMission, setDailyMission] = useState<MissionDoingProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  const currentDate = convertDate(new Date());
  const searchId = params.id

  useEffect(() => {
    fetchMissionData();
  }, []);

  const fetchMissionData = async () => {
    try {
      let { data: dailyMission } = await supabase
        .from("missionList")
        .select("*")
        .eq("createdAt", currentDate)
        .eq("user_uid", searchId)
        .eq("doingYn", true);
      setIsLoading(false);
      if (dailyMission?.length === 0) return <div>일일미션을 받아주세요!</div>;
      else {
        setDailyMission(dailyMission!);
      }
    } catch (error) {
      console.log("데이터가져올 때 에러", error);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <>
      {isLoading ? ( // isLoading이 true이면 로딩 표시를 표시합니다.
        <p>Loading...</p>
      ) : (
        <div className="flex justify-center items-center gap-x-4 text-gray-800 px-2">
          {dailyMission?.map((mission) => {
            return (
              <div
                className="py-6 px-4 flex flex-col justify-between items-center w-[180px] h-[300px] rounded-2xl break-words hover:scale-110 hover:duration-500 bg-[#F3FFEA]"
                key={mission.id}
              >
                <div className="flex flex-col gap-3 items-start self-stretch">
                  <h1 className="text-[24px] leading-[31px] font-semibold text-[#4DAB00]">
                    {mission.title}
                  </h1>

                  <div className="flex flex-col items-start gap-2 self-stretch ">
                    <div className="min-h-[127px] min-w-[121px] flex py-4 px-2 flex-col justify-between items-start gap-2 self-stretch bg-[#E8FFD4] rounded-2xl">
                      <p className="text-[14px] font-medium text-[#5FD100]">
                        {mission.content}
                      </p>
                      <p>{mission && mission.createdAt && mission.createdAt.replaceAll('-', '.')}까지</p>
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
      )}
    </>
  );
};

export default MissionDoing;
