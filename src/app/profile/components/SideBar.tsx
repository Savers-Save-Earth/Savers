"use client";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { convertDate } from "@/libs/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

type Profile = Database["public"]["Tables"]["user"]["Row"];
export interface DailyMission {
  id: string;
  uid: number;
  point: number;
  title: string;
  content: string;
  doingYn: boolean;
  address: string;
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
            <div className="rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex items-center justify-center">
              <img
                className="object-cover w-full h-full"
                src={profile.profileImage || ""}
                alt="이미지"
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
                className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
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
                    className="absolute top-[20px] right-[20px] hover:scale-[120%]"
                    icon={faCircleXmark}
                  />
                  {/* 모달 body */}
                  {dailyMission.map((missionItem) => (
                    <div
                      key={missionItem.id}
                      className="min-w-[200px] min-h-[280px] bg-transparent cursor-pointer group perspective rounded-2xl "
                    >
                      <div className="relative preserve-3d my-rotate-y-180">
                        <div className="absolute my-rotate-y-180-withoutkey min-w-[200px] min-h-[280px] bg-[#DBF8D9] rounded-2xl break-words">
                          <div className="px-3 flex flex-col items-center justify-center text-gray-800 gap-4 min-h-[230px]">
                            <p className=" text-gray-900 fixed top-1 w-full text-[20px] font-semibold text-center ">
                              {missionItem.title}
                            </p>
                            <p>{missionItem.content}</p>
                            {/* <p>안나옴?{missionItem?.address}</p> */}
                            <button
                              className="fixed bottom-2 py-1 px-3 rounded-full border-2 border-[#42723e] text-[#42723e] font-semibold hover:bg-[#42723e] hover:text-white hover:duration-500"
                              onClick={() =>
                                window.open(`${missionItem?.address}`)
                              }
                            >
                              미션하러 가기
                            </button>
                          </div>
                        </div>
                        <div className="absolute backface-hidden w-full h-[280px] rounded-2xl">
                          <img
                            src="https://img4.yna.co.kr/photo/ap/2012/12/11/PAP20121211146101034_P2.jpg"
                            className="w-full h-full rounded-2xl"
                          />
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
