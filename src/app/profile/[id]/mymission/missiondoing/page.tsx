'use client'

import supabase from "@/libs/supabase";
import { convertDate } from "@/libs/util";
import { Database } from "@/types/supabase";
import { ListMission } from "@/types/types";
import React, { useEffect, useState } from "react";

// export const revalidate = 0
type MissionDoingProp =Database["public"]["Tables"]["missionList"]["Row"];


const MissionDoing = ({ params }: { params: { id: string } }) => {
   const currentDate = convertDate(new Date());

  const [dailyMission, setDailyMission] = useState<MissionDoingProp[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  const searchId = decodeURIComponent(params.id);

  useEffect(() => {
    fetchMissionData(searchId)
  },[])

  const fetchMissionData = async (searchId: string) => {
    try {
      let { data: dailyMission } = await supabase
      .from("missionList")
      .select("*")
      .eq("createdAt", currentDate)
      .eq("userId", searchId)
      .eq("doingYn", true);
      setIsLoading(false)
      if (dailyMission?.length === 0) return <div>일일미션을 받아주세요!</div>;
      else {
        setDailyMission(dailyMission)
      }
    } catch (error) {
      console.log("데이터가져올 때 에러남");
      setIsLoading(false);
    return false;
    }
  } 

  return (
    <>

        <div className="bg-green-200 h-full flex justify-center items-center gap-x-16 text-white">
          {dailyMission?.map((mission) => {
            return (
              <div className="bg-slate-500" key={mission.id}>
                <p>{mission.id}</p>
                <p>{mission.title}</p>
                <p>{mission.content}</p>
                <p>{mission.doingYn!.toString()}</p>
              </div>
            );
          })}
        </div>
    </>
  );
};

export default MissionDoing;

// import supabase from "@/libs/supabase";
// import { convertDate } from "@/libs/util";
// import { ListMission } from "@/types/types";
// import React from "react";

// // export const revalidate = 0

// export const currentDate = convertDate(new Date());

// const MissionDoing = async ({ params }: { params: { id: string } }) => {
//   const searchId = decodeURIComponent(params.id);
//   let { data: dailyMission, error } = await supabase
//     .from("missionList")
//     .select("*")
//     .eq("createdAt", currentDate)
//     .eq("userId", searchId)
//     .eq("doingYn", true);

//   if (error) {
//     console.log("데이터가져올 때 에러남");
//     return false;
//   }
//   if (dailyMission?.length === 0) return <div>일일미션을 받아주세요!</div>;

//   return (
//     <div className="bg-green-200 h-full flex justify-center items-center gap-x-16 text-white">
//       {dailyMission?.map((mission: ListMission) => {
//         return (
//           <div className="bg-slate-500" key={mission.id}>
//             <p>{mission.id}</p>
//             <p>{mission.title}</p>
//             <p>{mission.content}</p>
//             <p>{mission.doingYn.toString()}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MissionDoing;
