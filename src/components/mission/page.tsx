"use client";
import React, { useEffect, useState } from "react";

const missionList = [
  {
    id: "mission01",
    title: "오늘의 쉐프1",
    content: "커뮤니티 레시피 카테고리 글작성 1회",
    doingYn: false,
    point: 1,
  },
  {
    id: "mission02",
    title: "오늘의 쉐프2",
    content: "커뮤니티 레시피 카테고리 글작성 2회",
    doingYn: false,
    point: 1,
  },
  {
    id: "mission03",
    title: "오늘의 쉐프3",
    content: "커뮤니티 레시피 카테고리 글작성 3회",
    doingYn: false,
    point: 1,
  },
  {
    id: "mission04",
    title: "오늘의 쉐프4",
    content: "커뮤니티 레시피 카테고리 글작성 4회",
    doingYn: false,
    point: 1,
  },
];

interface MissionItem {
  id: string;
  title: string;
  content: string;
  doingYn: boolean;
  point: number;
}

const Mission = () => {
  const [shuffledMission, setShuffledMission] = useState<MissionItem[]>([]);

  useEffect(() => {
    const abc = missionList.sort(() => Math.random() - 0.5).slice(0, 2);
    setShuffledMission(abc);
  }, []);
  // console.log("shuffledMission==>",shuffledMission)

  return (
    <section className="bg-pink-900 h-screen flex justify-center items-center gap-x-16 text-white">
      {shuffledMission.map((missionItem) => (
        <div className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective">
          <div className="relative preserve-3d my-rotate-y-180 w-full h-full">
            <div className="absolute w-full h-full my-rotate-y-180-withoutkey bg-gray-100">
              <div className="text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24">
                <h1 className="text-3x1 font-semibold">{missionItem.id}</h1>
                <p className="my-2">{missionItem.title}</p>
                <p className="my-2">{missionItem.content}</p>
              </div>
            </div>
            <div className="absolute backface-hidden border-2 w-full h-full">
              <img
                src="https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
export default Mission;
