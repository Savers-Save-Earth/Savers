"use client";

import { Database } from "@/types/supabase";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { convertDate } from "@/libs/util";
import supabase from "@/libs/supabase";

type Profile = Database["public"]["Tables"]["user"]["Row"];
interface DailyMission {
  id: string;
  uid: number;
  point: number;
  title: string;
  content: string;
  doingYn: boolean;
  address: string;
  bigCategory: string;
  smallCategory: string;
}

const initialProfile: any = {
  activePoint: null,
  badges: null,
  commentPosts: "",
  email: "",
  isActiveDone: false,
  likedPosts: "",
  likePosts: "",
  likeProducts: null,
  likeRestaurants: "",
  nickname: "",
  password: "",
  profileImage: "",
  provider: "",
  uid: "",
  writePosts: "",
};

const RandomMission = ({ user, showModal, setShowModal, profile }: any) => {
  const currentDate = convertDate(new Date());
  const currentDateModify = currentDate.replaceAll("-", ".") as string;
  const searchId = user?.id || ("" as string);

  const [dailyMission, setDailyMission] = useState<DailyMission[]>([]);
  const [modalController, setModalController] = useState(showModal);

  useEffect(() => {
    setModalController(showModal);
    insertMissionListData();
  }, [showModal]);

  const insertMissionListData = async () => {
    if (!searchId) {
      console.error("searchId is undefined");
      return;
    }
    let { data: missionListData, error } = await supabase
      .from("missionList")
      .select("*")
      .eq("createdAt", currentDate)
      .eq("user_uid", searchId);
    // supabase가 데이터 return할 때 빈 값은 "무조건" 빈 배열[]로 반환하기 때문에, missionListData === null 인 경우가 없다고 타입선언.
    const myMissions = missionListData!.length == 0 ? [] : missionListData;
    if (myMissions!.length > 0) {
      setDailyMission(myMissions || []);
      return false;
    } else {
      try {
        const { data: missions, error } = await supabase
          .from("mission")
          .select("*");

        if (error) {
          console.error("Error fetching mission data:", error);
          return;
        }

        const randomMissions = missions
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        const newMissions = randomMissions.map((mission) => ({
          missionUid: mission.uid,
          userId: profile.nickname,
          createdAt: convertDate(new Date()),
          title: mission.title,
          content: mission.content,
          bigCategory: mission.bigCategory,
          smallCategory: mission.smallCategory,
          doingYn: mission.doingYn,
          point: 1,
          user_uid: searchId,
          address: mission.address,
        }));

        for (const newMission of newMissions) {
          const { data, error: insertError } = await supabase
            .from("missionList")
            .insert([newMission]);

          if (insertError) {
            console.error("Error inserting data:", insertError);
          } else {
            console.log("Inserted data:", newMission);
          }
        }

        setDailyMission(randomMissions);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };
  return (
    <>
      {modalController && (
        <>
          <div
            onClick={() => {
              setModalController(false);
              setShowModal(false);
            }}
            className="fixed inset-0 bg-slate-400 bg-opacity-50"
          ></div>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
            <div className=" bg-white relative w-[480px] h-[729px] gap-3 p-8 flex flex-wrap items-center justify-center rounded-2xl">
              <div className="flex flex-col gap-5 justify-center items-center">
                <h1 className="text-gray-900 w-full text-2xl font-semibold leading-6">
                  오늘의 세이버 일일미션 랜덤 뽑기
                </h1>
                <p className="text-center text-gray-400 w-full text-lg font-normal leading-4">
                  미션을 클리어하고 배지를 받아보세요!
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute top-[20px] right-[20px] hover:scale-[120%] cursor-pointer"
                onClick={() => {
                  setModalController(false);
                  setShowModal(false);
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29294C17.6834 4.90242 18.3166 4.90242 18.7071 5.29294C19.0976 5.68347 19.0976 6.31663 18.7071 6.70716L13.4142 12L18.7071 17.2928C19.0976 17.6834 19.0976 18.3165 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                  fill="#98A2B3"
                />
              </svg>
              {dailyMission.map((missionItem) => (
                <div
                  key={missionItem.id}
                  className="min-w-[200px] min-h-[290px] bg-transparent cursor-pointer group perspective rounded-2xl "
                >
                  <div className="relative preserve-3d my-rotate-y-180">
                    <div className="absolute my-rotate-y-180-withoutkey min-w-[200px] min-h-[290px] bg-red-400 rounded-2xl break-words">
                      <div
                        className="py-6 px-4 flex flex-col justify-between items-center min-w-[200px] min-h-[290px] rounded-2xl break-words bg-[#F3FFEA]"
                        key={missionItem.id}
                      >
                        {/* 미션 완료여부에 따라 앞면을 다르게 보여주기 */}
                        {missionItem.doingYn === true ? (
                          <>
                            <div className="flex flex-col gap-3 items-start self-stretch">
                              <h1 className="text-[24px] leading-[31px] font-semibold text-[#4DAB00]">
                                {missionItem.title}
                              </h1>

                              <div className="flex flex-col items-start gap-2 self-stretch">
                                <div className="min-h-[127px] min-w-[121px] flex py-4 px-2 flex-col justify-between items-start gap-2 self-stretch bg-[#E8FFD4] rounded-2xl">
                                  <p className="text-[14px] font-medium text-[#5FD100]">
                                    {missionItem.content}
                                  </p>
                                  <p>{currentDateModify}까지</p>
                                </div>
                              </div>
                            </div>
                            <button
                              className="flex py-2 px-[10px] justify-center items-center gap-[10px] bg-[#5FD100] rounded-2xl text-[#FCFCFD]"
                              onClick={() =>
                                missionItem.bigCategory === "글쓰기"
                                  ? window.open("/community")
                                  : window.open("/product")
                              }
                            >
                              미션하러 가기
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col gap-3 items-start self-stretch opacity-30">
                              <h1 className="text-[24px] leading-[31px] font-semibold text-[#4DAB00]">
                                {missionItem.title}완료시에
                              </h1>

                              <div className="flex flex-col items-start gap-2 self-stretch">
                                <div className="min-h-[127px] min-w-[121px] flex py-4 px-2 flex-col justify-between items-start gap-2 self-stretch bg-[#E8FFD4] rounded-2xl">
                                  <p className="text-[14px] font-medium text-[#5FD100]">
                                    {missionItem.content}
                                  </p>
                                  <p>{currentDateModify}까지</p>
                                </div>
                              </div>
                            </div>

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

                            <button
                              disabled
                              className="flex py-2 px-[10px] justify-center items-center gap-[10px] bg-[#5FD100] rounded-2xl text-[#FCFCFD] disabled:opacity-50"
                              onClick={() =>
                                missionItem.bigCategory === "글쓰기"
                                  ? window.open("/community")
                                  : window.open("/product")
                              }
                            >
                              미션하러 가기
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="border border-[#56BE00] absolute backface-hidden w-full h-[280px] rounded-2xl">
                      {/* 카드 뒷면 */}
                      <svg
                        width="200"
                        height="280"
                        viewBox="0 0 200 280"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="200" height="280" rx="16" fill="#56BE00" />
                        <path
                          d="M80.2876 161.888C80.2876 161.888 98.9123 160.641 102.986 147.546C107.061 134.45 108.225 120.107 128.596 112C127.431 119.483 127.781 124.659 128.479 130.895C129.178 137.069 129.469 143.243 127.839 149.292C126.209 155.528 122.426 160.828 116.955 163.759C100.658 172.49 84.3617 165.63 80.2876 161.888Z"
                          fill="url(#paint0_linear_1308_24651)"
                        />
                        <path
                          d="M119.712 161.888C119.712 161.888 101.071 160.641 96.9933 147.546C92.9155 134.45 91.7504 120.107 71.3614 112C72.5265 119.483 72.177 124.659 71.4779 130.895C70.8372 137.007 70.5459 143.18 72.1187 149.229C73.8081 155.528 77.5364 160.828 83.0123 163.759C99.3235 172.49 115.635 165.63 119.712 161.888Z"
                          fill="url(#paint1_linear_1308_24651)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_1308_24651"
                            x1="100.507"
                            y1="112"
                            x2="100.507"
                            y2="168"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#66AB28" />
                            <stop offset="1" stopColor="#4F891C" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_1308_24651"
                            x1="95.3377"
                            y1="112"
                            x2="95.3377"
                            y2="168"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#8AE63F" />
                            <stop offset="1" stopColor="#77CA33" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RandomMission;
