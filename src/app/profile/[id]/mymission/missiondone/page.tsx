"use client";

import React from "react";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { fetchMissionDone } from "@/api/profile/fetchProfileData";
import NoListToShown from "@/components/profile/NoListShown";

const MissionDone = ({ params }: { params: { id: string } }) => {
  const searchId = params.id;

  const { data: missionDone, isLoading } = useQuery<any>(
    ["fetchMissionDone", searchId],
    () => fetchMissionDone(searchId),
    { cacheTime: 6000 },
  );
  if (isLoading) return <Loading />;

  if (missionDone && missionDone.length < 1) {
    return <NoListToShown listProp={"noMissionDone"} />;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-4 text-gray-800">
      {missionDone?.map((mission: any) => {
        return (
          <div
            className="relative py-6 px-4 flex flex-col justify-between items-center w-[180px] h-[300px] rounded-2xl break-words hover:scale-110 hover:duration-500 opacity-100 bg-[#F3FFEA]"
            key={mission.id}
          >
            {/* 내용 및 버튼 */}
            <div className="flex flex-col gap-3 items-start self-stretch opacity-10">
              <h1 className="text-[24px] leading-[31px] font-semibold text-[#4DAB00]">
                {mission.title}
              </h1>

              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="min-h-[127px] min-w-[121px] flex py-4 px-2 flex-col justify-between items-start gap-2 self-stretch bg-[#E8FFD4] rounded-2xl">
                  <p className="text-[14px] font-medium text-[#5FD100]">
                    {mission.content}
                  </p>
                  <p className="text-gray-500">
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
              className="flex py-2 px-[10px] justify-center items-center gap-[10px] bg-[#5FD100] rounded-2xl text-[#FCFCFD] disabled:opacity-10"
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

export default MissionDone;
