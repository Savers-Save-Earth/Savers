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

interface Community {
  author_uid: string
  category: string
  content: string
  created_date: string
  number_comments: number | null
  post_uid: string
  title: string
  updated_date: string
}
interface ProfileProps {
  profileId: string;
}
const Profile = ( { profileId }: ProfileProps ) => {
  const [selectedMenu, setSelectedMenu] = useState<string>("profile");
  const [showMission, setShowMission] = useState<string>("missionDoing");
  const [showActivity, setShowActivity] = useState<string>("myPost");
  const [userData, setUserData] = useState<Profile | null>(null);
  const [userPost, setUserPost] = useState<Community[]>([]);
  const [loadCount, setLoadCount] = useState<number>(2)
  useEffect(() => {
    fetchProfile()
    
  }, []);
  useEffect(() => {
    fetchCommunity()
  }, [loadCount])

  const fetchProfile = async () => {
    let { data: user, error } = await supabase.from("user").select().match({"uid" : profileId})
    if(error) {
      return false
    }
    setUserData(user![0]);
  };
  const fetchCommunity = async () => {
    // 달린 댓글 개수랑 좋아요는 어떻게 기입되는지 로직을 여쭤봐야 함 : supabase 내부적으로 댓글갯수를 count하여 다른 db에 넣는 방법이 있다고 함. 
    // 해당 기능 개발과정을 본 후에 community에서 바로 끌고 올 지 판단
    let { data: community, error } = await supabase.from('community').select().match({"author_uid": profileId}).range(0, loadCount - 1)
    setUserPost(community || [])
  }

  const handleLoadMore = () => {
    setLoadCount(prev => prev + 2)
  }
  
  const handleSelectMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMenu(event.currentTarget.value);
  };
  const handleSelectMission = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowMission(event.currentTarget.value);
  };
  const handleSelectActivity = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowActivity(event.currentTarget.value);
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
          <h5>{userData && userData.nickname}</h5>
          {/* 요거 수정 모달창으로 한다고 했나?? */}
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
        {selectedMenu === "profile" && (
          <>
            <div className="w-1/2 p-4 border-dashed border-2 border-green-600 mx-3">
              일일미션 완료현황(잔디밭)
            </div>
            <div className="w-1/2 p-4 border-dashed border-2 border-purple-600 mx-3">
              내가 획득한 뱃지
            </div>
          </>
        )}
        {selectedMenu === "mymission" && (
          <div className="flex flex-col w-full border-dashed border-2 border-orange-600 p-5">
            <h3>나의 미션</h3>
            <div className="flex items-center gap-10">
              <button value="missionDoing" className="hover:font-bold focus:font-bold focus:underline decoration" onClick={handleSelectMission}>
                진행중인 미션
              </button>
              <button value="missionDone" className="hover:font-bold focus:font-bold focus:underline decoration" onClick={handleSelectMission}>
                완료한 미션
              </button>
            </div>
            <div className="border-dashed border-2 border-yellow-600 w-full h-full p-5">
              {showMission === "missionDoing" && (
                <>
                <div>진행중인 미션이 나오게 됨</div>
                <div>나중에 Carousel을 추가해야 함</div>
              </>
              )}
              {showMission === "missionDone" && 
              <>
              <div>완료한 미션이 나오게 됨</div>
              <div>나중에 Carousel이나 로그? "내가 쓴 글"처럼 리스트를 추가해야 함</div>
              </>}
            </div>
          </div>
        )}
        {selectedMenu === "activity" && 
         <div className="flex flex-col w-full border-dashed border-2 border-orange-600 h-full p-5">
         <h3>커뮤니티 활동</h3>
         <div className="flex items-center gap-10">
           <button value="myPost" className="hover:font-bold focus:font-bold focus:underline decoration" onClick={handleSelectActivity}>
             내가 쓴 글
           </button>
           <button value="myComment" className="hover:font-bold focus:font-bold focus:underline decoration" onClick={handleSelectActivity}>
             내가 쓴 댓글
           </button>
           <button value="bookedPost" className="hover:font-bold focus:font-bold focus:underline decoration" onClick={handleSelectActivity}>
             북마크한 글
           </button>
           <button value="bookedRestaurant" className="hover:font-bold focus:font-bold focus:underline decoration" onClick={handleSelectActivity}>
             북마크한 식당
           </button>
           <button value="bookedProduct" className="hover:font-bold focus:font-bold focus:underline decoration" onClick={handleSelectActivity}>
             북마크한 제품
           </button>
         </div>
         <div className="border-dashed border-2 border-yellow-900 w-full h-4/5">
           {showActivity === "myPost" && (
             <>
             <div className="border-solid border-2 border-green-900 overflow-y-auto h-3/4">내가 쓴 글이 나와야 함
             {userPost.map((post) => (
              <div className="border-solid border-2 border-blue-900 p-5 m-5" key={post.post_uid}>
              <p>글 uid : {post.post_uid}</p>
              <p>글 제목 : {post.title}</p>
              <p>등록일: {post.updated_date.slice(0,10)}</p>
              </div>
             ))}
             <button onClick={handleLoadMore}>더 보기</button>
             </div>
           </>
           )}
           {showActivity === "myComment" && 
           <>
           <div>내가 쓴 댓글과 댓글단 글이 나와야 함</div>
           <div>나중에 Carousel이나 로그? "내가 쓴 글"처럼 리스트를 추가해야 함</div>
           </>}
           {showActivity === "bookedPost" && 
           <>
           <div>내가 북마크한 글이 나와야 함</div>
           <div>나중에 Carousel이나 로그? "내가 쓴 글"처럼 리스트를 추가해야 함</div>
           </>}
           {showActivity === "bookedRestaurant" && 
           <>
           <div>내가 북마크한 식당이 나와야 함</div>
           <div>나중에 Carousel이나 로그? "내가 쓴 글"처럼 리스트를 추가해야 함</div>
           </>}
           {showActivity === "bookedProduct" && 
           <>
           <div>내가 북마크한 제품이 나와야 함</div>
           <div>나중에 Carousel이나 로그? "내가 쓴 글"처럼 리스트를 추가해야 함</div>
           </>}
         </div>
       </div>
        }
      </div>
    </section>
  );
};

export default Profile;
