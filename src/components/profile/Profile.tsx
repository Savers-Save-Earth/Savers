"use client";
import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";

interface Profile {
  activePoint: number | null;
  badges: string | null;
  commentPosts: string | null;
  email: string | null;
  isActiveDone: boolean | null;
  likedPosts: string | null;
  likePosts: string | null;
  likeProducts: string | null;
  likeRestaurants: string | null;
  nickname: string | null;
  password: string | null;
  profileImage: string | null;
  provider: string | null;
  uid: string;
  writePosts: string | null;
}

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("profile");
  const [showMission, setShowMission] = useState<string>("missionDoing");
  const [userData, setUserData] = useState<Profile>({});
  useEffect(() => {
    const fetchProfile = async () => {
      let { data: user, error } = await supabase.from("user").select();
      console.log("user==>", user)
      const userData = user![0]
      setUserData(userData)
    };
    fetchProfile()
  }, []);
console.log("userData=>",userData)
  const handleSelectMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMenu(event.currentTarget.value);
  };

  return (
    <section className="flex gap-2 h-screen">
      <div className="w-1/4 p-4 border-dashed border-2 border-indigo-600">
        <div className="flex flex-col items-center">
          <div className="rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex items-center justify-center">
            <img
              className="object-cover w-full h-full"
              src="https://mblogthumb-phinf.pstatic.net/MjAyMDAzMTRfMjEx/MDAxNTg0MTYwNDY2OTAz.wZh-CB69EFuLrzcYtazq0S09pLkPKmSEuNZ9oTT5HOgg.JtcbcQdcXEJpvI9yshH96p6sbfAO0TXMbQa0SgRXfiog.JPEG.ultrainsup/1510559187327m0.jpg?type=w800"
              alt="이미지"
            />
          </div>
          <h5>{userData!.nickname}</h5>
          <button
            className="mb-2 text-blue-500 hover:text-blue-700 hover:underline decoration-double"
            value="profile"
          >
            프로필 수정
          </button>

          <button
            className="mb-2 text-blue-500 hover:text-blue-700 hover:underline decoration-double"
            value="profile"
            onClick={handleSelectMenu}
          >
            프로필
          </button>
          <button
            className="mb-2 text-blue-500 hover:text-blue-700 hover:underline decoration-double"
            value="mymission"
            onClick={handleSelectMenu}
          >
            나의 미션
          </button>
          <button
            className="mb-2 text-blue-500 hover:text-blue-700 hover:underline decoration-double"
            value="activity"
            onClick={handleSelectMenu}
          >
            커뮤니티 활동
          </button>
          <button
            className="mb-2 text-blue-500 hover:text-blue-700 hover:underline decoration-double"
            value="changeInfo"
            onClick={handleSelectMenu}
          >
            회원정보 수정
          </button>
        </div>
      </div>
      <div className="w-3/4 p-4 border-dashed border-2 border-red-600 flex">
        {selectedMenu === "profile" && 
        <>
        <div className="w-1/2 p-4 border-dashed border-2 border-green-600 mx-3">일일미션 완료현황</div>
        <div className="w-1/2 p-4 border-dashed border-2 border-purple-600 mx-3">잔디밭</div>
        </>
        }
        {selectedMenu === "mymission" && 
<div className="flex flex-col items-center">
  <h3>나의 미션</h3>
<div className="flex items-center gap-10">
  <h4 id="missionDoing">진행중인 미션</h4>
  <h4 id="missionDone">완료한 미션</h4>
</div>
<div>
        보여주면 될 거 같은데?
  </div>
</div>

        }
        {selectedMenu === "activity" && <div>커뮤니티 활동 페이지</div>}
        {selectedMenu === "changeInfo" && <div>회원정보 수정 페이지</div>}
      </div>
    </section>
  );
};

export default Profile;
