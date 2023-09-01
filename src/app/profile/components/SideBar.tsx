"use client";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { convertDate } from "@/libs/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";

type Profile = Database["public"]["Tables"]["user"]["Row"];
export interface DailyMission {
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

const SideBar = () => {
  const currentDate = convertDate(new Date());
  const currentDateModify = currentDate.replaceAll("-", ".");
  const params = useParams().id as string;
  const decodedParams = decodeURIComponent(params);

  const router = useRouter();
  const searchId = decodedParams as string;

  const getProfile = async (id: string) => {
    let { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("nickname", searchId);
    return user![0];
  };

  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [dailyMission, setDailyMission] = useState<DailyMission[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(false);
    } else {
      setUser(user);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  // getUser()

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await getProfile(searchId);
      setProfile(fetchedProfile);
    };
    fetchProfile();
  }, [searchId]);

  const insertMissionListData = async () => {
    let { data: missionListData, error } = await supabase
      .from("missionList")
      .select("*")
      .eq("createdAt", currentDate)
      .eq("userId", searchId);
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
          userId: searchId,
          createdAt: convertDate(new Date()),
          title: mission.title,
          content: mission.content,
          bigCategory: mission.bigCategory,
          smallCategory: mission.smallCategory,
          doingYn: mission.doingYn,
          point: 1,
          user_uid: user.id,
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
    <div className="flex flex-col items-start gap-16 text-gray-900">
      <h1 className="text-[24px] non-italic font-semibold">마이페이지</h1>
      {profile ? (
        <>
          <div className="flex flex-col justify-center items-center gap-6 self-stretch leading-none">
            <div className="relative w-[140px] h-[140px] object-contain">
              <Image
                fill={true}
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg"
                alt="프로필 이미지"
              />
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-900 text-[24px] non-italic font-semibold leading-7">
                {profile.nickname}
              </p>
              <button className="text-gray-400 text-[16px] non-italic font-normal leading-4">
                프로필 수정
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6">
            <button
              className="btn-sidebar"
              onClick={() => router.push(`/profile/${searchId}/myprofile`)}
            >
              프로필
            </button>
            <button
              className="btn-sidebar"
              onClick={() =>
                router.push(`/profile/${searchId}/mymission/missiondoing`)
              }
            >
              나의 미션
            </button>
            <button
              className="btn-sidebar"
              onClick={() =>
                router.push(`/profile/${searchId}/mycommunity/myposts`)
              }
            >
              커뮤니티 활동
            </button>
            <button
              className="btn-sidebar"
              onClick={() =>
                router.push(
                  `/profile/${searchId}/myfavorite/myfavoriteproducts`,
                )
              }
            >
              좋아요
            </button>
            {user && user.id == profile.uid ? (
              <button
                className="btn-sidebar"
                onClick={() => {
                  // 일일미션 뽑기 함수
                  insertMissionListData();
                  // 일일미션 모달 띄우기
                  setShowModal(true);
                }}
              >
                일일미션 뽑기
              </button>
            ) : (
              ""
            )}
            {/* {user && user.id == profile.uid ? (
              <button className="btn-sidebar"
                onClick={() => {
                  router.push(`/profile/${searchId}/setting`);
                }}
              >
                회원정보 관리
              </button>
            ) : (
              ""
            )} */}
          </div>
          {showModal && (
            <>
              <div
                onClick={() => setShowModal(false)}
                className="fixed inset-0 bg-slate-400 bg-opacity-50"
              ></div>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
                <div className="border-2 border-slate-600 bg-white relative w-[480px] h-[729px] gap-3 p-8 flex flex-wrap items-center justify-center rounded-2xl">
                  <div className="flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-gray-900 w-full text-2xl font-semibold leading-6">
                      오늘의 세이버 일일미션 랜덤 뽑기
                    </h1>
                    <p className="text-center text-gray-400 w-full text-lg font-normal leading-4">
                      미션을 클리어하고 배지를 받아보세요!
                    </p>
                  </div>
                  <FontAwesomeIcon
                    className="absolute top-[20px] right-[20px] hover:scale-[120%] cursor-pointer"
                    icon={faCircleXmark}
                    onClick={() => setShowModal(false)}
                  />
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
                            <rect
                              width="200"
                              height="280"
                              rx="16"
                              fill="#56BE00"
                            />
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
                                <stop stop-color="#66AB28" />
                                <stop offset="1" stop-color="#4F891C" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_1308_24651"
                                x1="95.3377"
                                y1="112"
                                x2="95.3377"
                                y2="168"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#8AE63F" />
                                <stop offset="1" stop-color="#77CA33" />
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
      ) : (
        <>{/* <Loading /> */}</>
      )}
    </div>
  );
};
export default SideBar;
