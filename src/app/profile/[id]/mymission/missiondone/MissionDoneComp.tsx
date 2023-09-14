"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMissionDone } from "@/api/profile/fetchProfileData";
import NoListToShown from "@/components/profile/NoListShown";
import LoadingMission from "@/components/profile/ui/LoadingMission";
import { MissionListType } from "@/types/types";
import Image from "next/image";

const MissionDoneComp = ({ id }: { id: string }) => {
  const searchId = id;

  const { data: missionDone, isLoading } = useQuery(
    ["fetchMissionDone", searchId],
    () => fetchMissionDone(searchId),
    { cacheTime: 6000 },
  );
  if (isLoading) return <LoadingMission />;

  if (missionDone && missionDone.length < 1) {
    return <NoListToShown listProp={"noMissionDone"} />;
  }

  return (
    <div className="grid md:grid-cols-4 md:gap-10 grid-cols-2 gap-3 place-items-center">
      {missionDone?.map((mission: MissionListType) => {
        return (
          <div
            className="relative py-2 sm:py-6 px-4 flex flex-col justify-between items-center w-[8rem] h-[13rem] sm:w-[180px] sm:h-[300px] rounded-2xl break-words hover:scale-110 hover:duration-500 opacity-100 bg-[#F3FFEA]"
            key={mission.id}
          >
            {/* 내용 및 버튼 */}
            <div className="flex flex-col gap-2 items-start self-stretch opacity-10">
              <div className="relative min-w-[32px] min-h-[32px] sm:min-w-[64px] sm:min-h-[64px]">
                <Image
                  src={mission.icon}
                  alt="완료미션카드 아이콘"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                {/* <img
                  className="w-[32px] h-[32px] sm:w-[64px] sm:h-[64px]"
                  src={mission.icon}
                  alt="아이콘 이미지 없음"
                /> */}
              </div>
              <h1 className="text-[1rem] sm:text-[24px] sm:leading-[29px] font-semibold text-[#4DAB00]">
                {mission.title}
              </h1>

              <div className="flex flex-col items-start gap-1 self-stretch">
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

            {/* 이미지 및 "미션 완료" 부분 */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center object-cover gap-4">
              <div className="bg-white rounded-full p-4 flex justify-center ">
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icon">
                    <path
                      id="Vector (Stroke)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M35.0118 10.4882C35.6627 11.139 35.6627 12.1943 35.0118 12.8452L18.3452 29.5118C17.6943 30.1627 16.639 30.1627 15.9881 29.5118L7.65481 21.1785C7.00394 20.5276 7.00394 19.4724 7.65481 18.8215C8.30569 18.1706 9.36096 18.1706 10.0118 18.8215L17.1667 25.9763L32.6548 10.4882C33.3057 9.83728 34.361 9.83728 35.0118 10.4882Z"
                      fill="#5FD100"
                    />
                  </g>
                </svg>
              </div>
              <p className="text-[#4DAB00] text-2xl leading-6 font-semibold">
                미션 완료!
              </p>
            </div>

            {/* 버튼 */}
            <button
              disabled
              className="absolute bottom-3 text-xs sm:text-base py-1 px-1 sm:py-2 sm:px-[10px] justify-center items-center gap-[10px] bg-[#5FD100] rounded-2xl text-[#FCFCFD] disabled:opacity-10"
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

export default MissionDoneComp;
