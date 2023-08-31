'use client'

import supabase from "@/libs/supabase";
import { convertDate } from "@/libs/util";
import { Database } from "@/types/supabase";
import { ListMission } from "@/types/types";
import React, { useState, useEffect } from "react";

// export const revalidate = 0;

type MissionDoneProp =Database["public"]["Tables"]["missionList"]["Row"];

const MissionDone = ({ params }: { params: { id: string } }) => {
  const [missionDone, setMissionDone] = useState<MissionDoneProp[]>([])  
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  const searchId = decodeURIComponent(params.id);
  useEffect(() => {
    fetchMissionData(searchId)
  },[])

  const fetchMissionData = async (searchId: string) => {
    try {
      let { data: missionDone } = await supabase
      .from("missionList")
      .select("*")
      // .eq("createdAt", currentDate)
      .eq("userId", searchId)
      .eq("doingYn", false);
      setIsLoading(false); // 데이터 가져오기 후 로딩 상태를 false로 설정
      if (missionDone?.length === 0) return <div>지금까지 완료한 미션이 없네요!!</div>;
      else {
        setMissionDone(missionDone!)
      }
    } catch (error) {
      console.log("데이터가져올 때 에러남");
      setIsLoading(false);
    return false;
    }
  }

  return (
    <>
    {isLoading ? ( // isLoading이 true이면 로딩 표시를 표시합니다.
        <p>Loading...</p>
      ) : (
        <div className="bg-green-200 h-full justify-center items-center gap-x-16 text-white">
        {missionDone!.map((mission: MissionDoneProp) => {
          return (
            <div className="bg-slate-500 mb-5" key={mission.id}>
              <p>{mission.id}</p>
              <p>미션 제목 : {mission.title}</p>
              <p>미션 내용 : {mission.content}</p>
              <p>미션 생성일 : {mission.createdAt}</p>
              {/* <p>미션 수행중인가요? : {mission.doingYn.toString()}</p> */}
            </div>
          );
        })}
      </div>
      )}
    </>

  );
};

export default MissionDone;
