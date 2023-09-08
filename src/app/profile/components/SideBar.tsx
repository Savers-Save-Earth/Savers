"use client";
import supabase from "@/libs/supabase";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import RandomMission from "./RandomMission";
import EditProfile from "@/components/profile/EditProfile";
import { Database } from "@/types/supabase";
import Loading from "@/app/loading";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchProfileData } from "@/api/profile/fetchProfileData";

type ProfileType = {
  activePoint: number;
  birthday: string;
  email: string;
  nickname: string;
  number: string;
  profileImage: string;
  provider: string;
  uid: string;
} | null;

const SideBar = () => {
  const searchId = useParams().id as string;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  // const [profileData, setProfileData] = useState<any>();
  // const [currentUser, setCurrentUser] = useState<any>()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHideProfile, setIsHideProfile] = useState(false);
  const [user, setUser] =useState<any>(null)
  const path = usePathname()
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        setUser(null);
      } else {
        setUser(session.user);
      }
    });
  }, [path]);

  const loginLogoutSwitcher = async () => {
    if (user) {
      const ok = window.confirm("로그아웃 하시겠습니까?");
      if (ok) {
        await supabase.auth.signOut();
        router.push("/")
      }
    } else {
      // const currentUrl = window.location.href;
      router.push("/login");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  //모바일 환경에서 프로필 이외의 다른 버튼들 클릭하면 프로필 이미지 등이 가려지게 하기 위함
  const hideProfile = (value: string) => {
    console.log("value:", value);
    window.innerWidth >= 768 ?  setIsHideProfile(false) : (
      (value === "프로필") ? setIsHideProfile(false) : setIsHideProfile(true)
    )
  };
  
  const currentUser = useAuth();
  const { data: profileData, isLoading } = useQuery<ProfileType>(
    ["fetchProfileData", searchId],
    () => fetchProfileData(searchId),
    { cacheTime: 30000 },
  );

  if (isLoading) return <Loading />;

  
  return (
      <div className="w-full flex flex-col items-start">
        <div className="w-full relative">
          <div className="flex flex-row justify-between">
            <h1 className="text-6 non-italic font-semibold">마이페이지</h1>
            {/* 햄버거 아이콘을 클릭하면 모바일 메뉴가 열리도록 설정 */}
            <button
              className="xl:hidden btn-sidebar"
              onClick={toggleMobileMenu}
            >
              ☰
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMobileMenuOpen && (
            <div className="xl:hidden absolute top-0 w-full h-screen shadow-md flex flex-col items-end bg-red-200">
              <button
                className="btn-sidebar"
                onClick={toggleMobileMenu}
              >
                X
              </button>
              <button
              value={"프로필"}
                className="btn-sidebar"
                onClick={(e) => {
                  toggleMobileMenu();
                  hideProfile(e.currentTarget.value);
                  router.push(`/profile/${searchId}/myprofile`)
                }
                  }
              >
                프로필
              </button>
              <button
              value={"나의 미션"}
                className="btn-sidebar"
                onClick={(e) =>{
                  toggleMobileMenu();
                  hideProfile(e.currentTarget.value);
                  router.push(`/profile/${searchId}/mymission/missiondoing`)
                }}
              >
                나의 미션
              </button>
              <button
              value={"커뮤니티 활동"}
                className="btn-sidebar"
                onClick={(e) =>{
                  toggleMobileMenu();
                  hideProfile(e.currentTarget.value);
                  router.push(`/profile/${searchId}/mycommunity/myposts`)
                }}
              >
                커뮤니티 활동
              </button>
              <button
              value={"좋아요"}
                className="btn-sidebar"
                onClick={(e) =>{
                  toggleMobileMenu();
                  hideProfile(e.currentTarget.value);
                  router.push(`/profile/${searchId}/myfavorite/myfavoriteproducts`)
                }}
              >
                좋아요
              </button>
              <button
                className="btn-sidebar"
                onClick={() =>{
                  loginLogoutSwitcher()
                }}
              >
                로그아웃
              </button>
              {currentUser && currentUser.uid == profileData?.uid && (
                <button
                  className="btn-sidebar"
                  onClick={() => {
                    toggleMobileMenu();
                    setShowModal(true);
                  }}
                >
                  일일미션 뽑기
                </button>
                
              )}
            </div>
          )}
        </div>

        <div className={`md:flex flex-col ${isHideProfile && (window.innerWidth < 768) ? "hidden" : "flex"} justify-center items-center gap-6 self-stretch leading-none`}>
        {/* <div className="hidden flex-col justify-center items-center gap-6 self-stretch leading-none"> */}
          <div className="w-[8.75rem] h-[8.75rem] aspect-w-1 aspect-h-1 object-contain rounded-full overflow-hidden mx-auto">
            {profileData?.profileImage ? (
              <img
                className="w-full h-full object-cover"
                src={profileData.profileImage}
                alt="프로필 이미지"
              />
            ) : (
              <Image
                fill={true}
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg"
                alt="프로필 이미지"
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-900 text-[24px] non-italic font-semibold leading-7">
              {profileData?.nickname}
            </p>
            {searchId == currentUser?.uid ? (
              <EditProfile profileData={profileData} />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* 웹 브라우저 환경에서 보여야 하는 버튼들 */}
        <div className="hidden xl:flex flex-col items-start gap-6">
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
              router.push(`/profile/${searchId}/myfavorite/myfavoriteproducts`)
            }
          >
            좋아요
          </button>
          {currentUser && currentUser.uid == profileData?.uid && (
            <button
              className="btn-sidebar"
              onClick={() => {
                setShowModal(true);
              }}
            >
              일일미션 뽑기
            </button>
          )}
        </div>
        <RandomMission
          showModal={showModal}
          user={profileData}
          setShowModal={setShowModal}
          profile={profileData}
        />
      </div>
  );
};
export default SideBar;
