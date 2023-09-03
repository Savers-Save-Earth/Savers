"use client";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { convertDate } from "@/libs/util";
import Image from "next/image";
import RandomMission from "./RandomMission";
import EditProfile from "@/components/profile/EditProfile";

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
  const currentDateModify = currentDate.replaceAll("-", ".") as string
  const searchId = useParams().id as string;
  // const decodedParams = decodeURIComponent(params);

  const router = useRouter();
  // const searchId = decodedParams as string;

  const getProfile = async () => {
    let { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("uid", searchId);
    return user![0];
  };

  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>();
  // const [searchId, setSearchId] = useState<string | undefined>(undefined);
  // 우정작업 //
  const [profileImg, setProfileImg] = useState<string>("");
  const [open, setOpen] = useState(false);

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

    const { data: userData } = await supabase
      .from("user")
      .select()
      .eq("uid", user?.id);

    if (userData) {
      setProfileImg(userData[0]?.profileImage);
    } else {
      return;
    }

    // 우정작업 //
  };
  // useEffect(() => {
  //   const idParams = useParams().id as string | undefined
  // })
  useEffect(() => {
    getUser();
  }, []);

  // 우정 작업 -> 프로필모달 열기 //

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await getProfile();
      setProfile(fetchedProfile);
    };
    fetchProfile();
  }, [searchId]);

  return (
    <div className="flex flex-col items-start gap-16 text-gray-900">
      <h1 className="text-[24px] non-italic font-semibold">마이페이지</h1>
      {profile ? (
        <>
          <div className="flex flex-col justify-center items-center gap-6 self-stretch leading-none">
            <div className="relative w-[140px] h-[140px] object-contain">
              {profileImg ? (
                <img className="w-[140px] h-[140px] rounded-full object-cover mx-auto" src={profileImg} alt="프로필 이미지" />
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
                {profile.nickname}
              </p>
              <EditProfile />
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

                  setShowModal(true);
                }}
              >
                일일미션 뽑기
              </button>
            ) : (
              ""
            )}
          </div>
            <RandomMission showModal={showModal} user={ user } setShowModal={setShowModal} profile={profile}/>
        </>
      ) : (
        <>{/* <Loading /> */}</>
      )}
    </div>
  );
};
export default SideBar;
