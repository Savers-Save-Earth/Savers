"use client";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { convertDate } from "@/libs/util";
import Image from "next/image";
import RandomMission from "./RandomMission";
import EditProfile from "@/components/profile/EditProfile";
import { Database } from "@/types/supabase";
import Loading from "@/app/loading";

const SideBar = () => {
  const searchId = useParams().id as string;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>();
  const [profileData, setProfileData] = useState<any>();
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(false);
    } else {
      setUser(user);
    }
    // 우정작업 //

    try {
      const { data: userData } = await supabase
      .from("user")
      .select("*")
      .eq("uid", searchId);

    if (userData) {
      setProfileData(userData[0]);
    } else {
      return;
    }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

    

    // 우정작업 //
  };

  useEffect(() => {
    getUser();
  }, [searchId]);

  // 이 주석 임시로 남겨놓았어요! 9/6에 삭제 예정(동준)
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const fetchedProfile = await getProfile();
  //     setProfile(fetchedProfile);
  //   };
  //   fetchProfile();
  // }, [searchId]);
  return (
    <div className="flex flex-col items-start gap-16 text-gray-900">
      <h1 className="text-[24px] non-italic font-semibold">마이페이지</h1>
      {profileData ? (
        <>
          <div className="flex flex-col justify-center items-center gap-6 self-stretch leading-none">
            <div className="relative w-[140px] h-[140px] object-contain">
              {profileData.profileImage ? (
                <img
                  className="w-[140px] h-[140px] rounded-full object-cover mx-auto"
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
                {profileData.nickname}
              </p>
              {searchId == user?.id ? <EditProfile /> : ""}
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
            {user && user.id == profileData.uid ? (
              <button
                className="btn-sidebar"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                일일미션 뽑기
              </button>
            ) : (
              ""
            )}
          </div>
          <RandomMission
            showModal={showModal}
            user={user}
            setShowModal={setShowModal}
            profile={profileData}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default SideBar;
