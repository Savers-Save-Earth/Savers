import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";

interface Badge {
  id: number;
  user_id: string;
  badge_title: string;
}

interface Badge2 {
  id: number;
  user_uid: string;
  bigCategory: string;
  smallCategory: string;
}

const BadgesTest = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const params = useParams();
  const searchId = decodeURIComponent(`${params.id}`);
  const [badges2, setBadges2] = useState<Badge2[]>([]);
  const [badges2Count, setBadges2Count] = useState<number>(0);

  const fetchBadges = async (user: any) => {
    console.log(user[0]);
    const { data: badgeData } = await supabase
      .from("badge")
      .select()
      .eq("user_id", user[0]?.uid);

    if (badgeData !== null) {
      setBadges(badgeData);
    }
  };

  const fetchBadgesByMission = async (user: any) => {
    console.log("미션의 유저===>",user[0]);
    const { data: badgeData2, count } = await supabase
      .from("missionList")
      .select("*", { count: 'exact' })
      .eq("user_uid", user[0]?.uid)
      .eq("doingYn", false)
    console.log("badgeData2====>",badgeData2)
    if (badgeData2 !== null && count !== null) {
      setBadges2(badgeData2);
      setBadges2Count(count)
    }
  };

  const fetchUser = async () => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("nickname", searchId)
      console.log("data==>",data);
    fetchBadges(data);
    fetchBadgesByMission(data)
  };

  const shareBadge = badges.find((item) => item.badge_title === "share");
  const threeShareBadge =
    badges.filter((item) => item.badge_title === "share").length >= 3;

  const likeBadge = badges.find((item) => item.badge_title === "like");
  const threeLikeBadge =
    badges.filter((item) => item.badge_title === "like").length >= 3;
/*
  const recipePostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "레시피")
  const restaurantPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "식당")
  const productPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "제품")
  const ohjiwanPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "오지완")
  */
//  const bronzeTrophy
const firstMission = badges2Count >= 1
//아래 뱃지 얻는 조건은 추후에 수정해야 함.
const bronzeThrophy = badges2Count >= 1
const silverThrophy = badges2Count >= 2
const goldThrophy = badges2Count >= 3

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 w-full h-full">
      <div className="bg-gray-200 p-4">[새싹 세이버] 회원가입시 받는 배지</div>
      <div className="bg-gray-200 p-4">
        {shareBadge
          ? "[나눔꾼] 물건 공유하기 배지"
          : "아직 공유하기 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
        {threeShareBadge
          ? "[나눔꾼3] 물건 세번 공유하기 배지"
          : "아직 세번 공유하기 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
        {likeBadge
          ? "[사랑꾼] 좋아요 1회 배지"
          : "좋아요 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
      {threeLikeBadge
          ? "[사랑꾼] 좋아요 3회 배지"
          : "좋아요 3회 배지를 획득하지 못했습니다."}
      </div>
      <div className="bg-gray-200 p-4">
      {firstMission
          ? (
            <>
            <img src="https://img.myloview.com/posters/cute-earth-character-green-and-blue-planet-save-earth-day-funny-emoticon-in-flat-style-cartoon-emoji-vector-illustration-400-204245384.jpg" />
            <p>[첫 미션 클리어]</p>
            </>
            )
          : (<p>"아직 [첫 미션 클리어] 배지를 획득하지 못했습니다."</p>)}
      </div>
      <div className="bg-gray-200 p-4">
      {bronzeThrophy
          ? (
            <>
            <img src="https://static.vecteezy.com/system/resources/previews/010/976/286/original/bronze-cup-3d-winner-award-3d-place-minimal-bronze-winners-stars-on-podium-champion-award-ceremony-concept-in-cartoon-style-3d-trophy-render-isolated-on-white-background-game-or-education-free-vector.jpg" />
            <p>[미션 헌터]</p>
            </>
            )
          : (<p>"아직 [미션 헌터] 배지를 획득하지 못했습니다."</p>)}
      </div>
      <div className="bg-gray-200 p-4">
      {silverThrophy
          ? (
            <>
            <img src="https://static.vecteezy.com/system/resources/previews/010/976/282/non_2x/silver-cup-3d-winner-award-2nd-place-minimal-silver-winners-stars-on-podium-champion-award-ceremony-concept-in-cartoon-style-3d-trophy-render-isolated-on-white-background-game-or-education-free-vector.jpg" />
            <p>[미션 프로]</p>
            </>
            )
          : (<p>"아직 [미션 프로] 배지를 획득하지 못했습니다."</p>)}
      </div>
      <div className="bg-gray-200 p-4">
      {goldThrophy
          ? (
            <>
            <img src="https://static.vecteezy.com/system/resources/previews/010/976/289/non_2x/golden-cup-3d-winner-award-1st-place-minimal-gold-winners-stars-on-podium-champion-award-ceremony-concept-in-cartoon-style-3d-trophy-render-isolated-on-white-background-game-or-education-free-vector.jpg" />
            <p>[미션 마스터]</p>
            </>
            )
          : (<p>"아직 [미션 마스터] 배지를 획득하지 못했습니다."</p>)}
      </div>
      {/*<div className="bg-gray-200 p-4">
      {recipePostBadge
          ? (
            <>
            <img src="https://img.freepik.com/premium-vector/cute-panda-is-writing-animal-education-icon-concept_493206-152.jpg?w=2000" />
            <p>[애기 쉐프]</p>
            </>
            )
          : (<p>"아직 [애기 쉐프] 배지를 획득하지 못했습니다."</p>)}
      </div> */}
    </div>
  );
};

export default BadgesTest;

// 우정님 작업 코드
// import React, { useEffect } from "react";
// import { useState } from "react";
// import supabase from "@/libs/supabase";
// import { useParams } from "next/navigation";

// interface Badge {
//   id: number;
//   user_id: string;
//   badge_title: string;
// }

// const Badges = () => {
//   const [badges, setBadges] = useState<Badge[]>([]);
//   const params = useParams();
//   const searchId = decodeURIComponent(`${params.id}`);

//   const fetchBadges = async (user: any) => {
//     console.log(user[0]);
//     const { data: badgeData } = await supabase
//       .from("badge")
//       .select()
//       .eq("user_id", user[0]?.uid);

//     if (badgeData !== null) {
//       setBadges(badgeData);
//     }
//   };

//   const fetchUser = async () => {
//     const { data } = await supabase
//       .from("user")
//       .select()
//       .eq("nickname", searchId);

//     fetchBadges(data);
//   };

//   const shareBadge = badges.find((item) => item.badge_title === "share");
//   const threeShareBadge =
//     badges.filter((item) => item.badge_title === "share").length >= 3;

//   const likeBadge = badges.find((item) => item.badge_title === "like");
//   const threeLikeBadge =
//     badges.filter((item) => item.badge_title === "like").length >= 3;

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <p>[새싹 세이버] 회원가입시 받는 배지</p>
//       <p>
//         {shareBadge
//           ? "[나눔꾼] 물건 공유하기 배지"
//           : "아직 공유하기 배지를 획득하지 못했습니다."}
//       </p>
//       <p>
//         {threeShareBadge
//           ? "[나눔꾼3] 물건 세번 공유하기 배지"
//           : "아직 세번 공유하기 배지를 획득하지 못했습니다."}
//       </p>
//       <p>
//         {likeBadge
//           ? "[사랑꾼] 좋아요 1회 배지"
//           : "좋아요 배지를 획득하지 못했습니다."}
//       </p>
//       <p>
//         {threeLikeBadge
//           ? "[사랑꾼] 좋아요 3회 배지"
//           : "좋아요 3회 배지를 획득하지 못했습니다."}
//       </p>
//     </div>
//   );
// };

// export default Badges;
