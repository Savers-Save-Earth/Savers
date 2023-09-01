"use client";

import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import React, { useState, useEffect } from "react";

type MissionDoneProp = Database["public"]["Tables"]["missionList"]["Row"];

const MissionDone = ({ params }: { params: { id: string } }) => {
  const [missionDone, setMissionDone] = useState<MissionDoneProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  const searchId = decodeURIComponent(params.id);

  useEffect(() => {
    fetchMissionData(searchId);
  }, []);

  const fetchMissionData = async (searchId: string) => {
    try {
      let { data: missionDone } = await supabase
        .from("missionList")
        .select("*")
        .eq("userId", searchId)
        .eq("doingYn", false);

      setIsLoading(false); // 데이터 가져오기 후 로딩 상태를 false로 설정

      if (missionDone?.length === 0) {
        setMissionDone([]);
        return <div>지금까지 완료한 미션이 없네요!!</div>;
      } else {
        setMissionDone(missionDone!);
      }
    } catch (error) {
      console.log("데이터가져올 때 에러:", error);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <>
      {isLoading ? ( // isLoading이 true이면 로딩 표시를 표시합니다.
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-start items-center gap-4 text-gray-800">
          {missionDone?.map((mission) => {
            return (
              <div
                className="py-6 px-4 flex flex-col justify-between items-center w-[200px] h-[300px] rounded-2xl break-words bg-[#F3FFEA]"
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

                {/* <button
                  className="flex py-2 px-[10px] justify-center items-center gap-[10px] bg-[#5FD100] rounded-2xl text-[#FCFCFD]"
                  onClick={() =>
                    mission.bigCategory === "글쓰기"
                      ? window.open("/community")
                      : window.open("/product")
                  }
                >
                  미션하러 가기
                </button> */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MissionDone;
