'use client'

import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import React, { useState, useEffect } from "react";

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
      .eq("userId", searchId)
      .eq("doingYn", false);

      setIsLoading(false); // 데이터 가져오기 후 로딩 상태를 false로 설정

      if (missionDone?.length === 0) {
        setMissionDone([])
        return <div>지금까지 완료한 미션이 없네요!!</div>;
      }
      else {
        setMissionDone(missionDone!)
      }
    } catch (error) {
      console.log("데이터가져올 때 에러:", error);
      setIsLoading(false);
    return false;
    }
  }

  return (
    <>
      {isLoading ? ( // isLoading이 true이면 로딩 표시를 표시합니다.
        <p>Loading...</p>
      ) : (
<div className="flex flex-wrap justify-start items-center gap-4 text-gray-800">
  {missionDone?.map((mission) => {
    return (
      <div
        className="py-[40px] px-3 flex flex-col justify-start items-center w-[169px] h-[280px] rounded-2xl break-words gap-[40px] p-1"
        style={{
          backgroundImage: `url('https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/missionDOneCard_200_300.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9taXNzaW9uRE9uZUNhcmRfMjAwXzMwMC5wbmciLCJpYXQiOjE2OTM0NzYzNjUsImV4cCI6MTY5NjA2ODM2NX0.crCRDp7gU6YrfvgzNyIYtE4Bq6JREBNsMBc79i2iH9k&t=2023-08-31T10%3A06%3A05.635Z')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        key={mission.id}
      >
        <h1 className="text-center font-semibold">{mission.title}</h1>
        <div>{mission.content}</div>
        <p>{mission}</p>
      </div>
    );
  })}
</div>

      )}
    </>

  );
};

export default MissionDone;
// 'use client'

// import supabase from "@/libs/supabase";
// import { Database } from "@/types/supabase";
// import React, { useState, useEffect } from "react";

// type MissionDoneProp = Database["public"]["Tables"]["missionList"]["Row"];

// const MissionDone = ({ params }: { params: { id: string } }) => {
//   const [missionDone, setMissionDone] = useState<MissionDoneProp[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const searchId = decodeURIComponent(params.id);

//   useEffect(() => {
//     fetchMissionData(searchId);
//   }, []);

//   const fetchMissionData = async (searchId: string) => {
//     try {
//       let { data: missionData } = await supabase
//         .from("missionList")
//         .select("*")
//         .eq("doingYn", false)
//         .eq("userId", searchId);

//       setIsLoading(false);

//       if (missionData?.length === 0) {
//         // 데이터가 없을 때 JSX 반환
//         setMissionDone([]);
//       } else {
//         setMissionDone(missionData);
//       }
//     } catch (error) {
//       console.log("데이터 가져오기 에러:", error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="bg-green-200 h-full justify-center items-center gap-x-16 text-white">
//           {missionDone.map((mission: MissionDoneProp) => (
//             <div className="bg-slate-500 mb-5" key={mission.id}>
//               <p>{mission.id}</p>
//               <p>미션 제목: {mission.title}</p>
//               <p>미션 내용: {mission.content}</p>
//               <p>미션 생성일: {mission.createdAt}</p>
//               {/* <p>미션 수행중인가요? : {mission.doingYn!.toString()}</p> */}
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default MissionDone;
