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
  const searchId = decodeURIComponent(params.id);

  useEffect(() => {
    fetchMissionData(searchId);
  }, []);

  const fetchMissionData = async (searchId: string) => {
    try {
      let { data: dailyMission } = await supabase
        .from("missionList")
        .select("*")
        .eq("createdAt", currentDate)
        .eq("userId", searchId)
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

  // const routTo = (obj: any) => {
  //   if (obj.bigCategory === "글쓰기") {
  //     window.open(`/community`)
  //   }
  //   else {
  //     window.open(`/product`)
  //   }
  // }
  return (
    <>
      {isLoading ? ( // isLoading이 true이면 로딩 표시를 표시합니다.
        <p>Loading...</p>
      ) : (
        <div className="flex justify-center items-center gap-x-4 text-gray-800">
          {dailyMission?.map((mission) => {
            return (
              <div
                className="py-[40px] px-3 flex flex-col justify-start items-center bg-[#DBF8D9] w-[169px] h-[280px] rounded-2xl break-words gap-[40px] p-1"
                key={mission.id}
              >
                <h1 className="text-center font-semibold">{mission.title}</h1>
                <div>{mission.content}</div>
                <button
                  className="bottom-8 py-1 px-3 rounded-full border-2 border-[#42723e] text-[#42723e] font-semibold hover:bg-[#42723e] hover:text-white hover:duration-500"
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
