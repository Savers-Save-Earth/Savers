"use client";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
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

  const currentUser = useAuth();
  const { data: profileData, isLoading} = useQuery<ProfileType>(
    ["fetchProfileData", searchId],
    () => fetchProfileData(searchId),
    { cacheTime : 6000 },
  )
  if (isLoading) return <Loading/>
    
//   const getUser = async () => {
//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
  
//       if (!user) {
//         return false;
//       } else {
//         // setCurrentUser(user)
//       }
//     } catch (error) {
//       console.error("Error getting user:", error);
//       return null; // You might want to handle errors appropriately
//     }
//   }

  
//     // 우정작업 //
// const fetchProfile = async () => {

//   if(!searchId) return;
//   try {
//     const { data: userData } = await supabase
//     .from("user")
//     .select("*")
//     .eq("uid", searchId);

//   if (userData) {
//     setProfileData(userData[0]);
//   } else {
//     return;
//   }
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// }

//   useEffect(() => {
//     if(searchId) {
//       getUser()
//       fetchProfile()
//     }
//   }, [searchId]);


  return (
    <div className="flex flex-col items-start gap-16 text-gray-900">
      <h1 className="text-[24px] non-italic font-semibold">마이페이지</h1>
        <>
          <div className="flex flex-col justify-center items-center gap-6 self-stretch leading-none">
            <div className="relative w-[140px] h-[140px] object-contain">
              {profileData?.profileImage ? (
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
                {profileData?.nickname}
              </p>
              {searchId == currentUser?.uid ? <EditProfile /> : ""}
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
            {/* {currentUser && currentUser.id == profileData.uid ? ( */}
              <button
                className="btn-sidebar"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                일일미션 뽑기
              </button>
             {/* ) : ( */}
               {/* "" */}
             {/* )} */}
          </div>
          {/* <RandomMission
            showModal={showModal}
            user={profileData}
            setShowModal={setShowModal}
            profile={profileData}
          /> */}
        </>

    </div>
  );
};
export default SideBar;
