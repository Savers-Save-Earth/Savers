import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";

interface Badge {
  id: number;
  user_id: string;
  badge_title: string;
}

interface BadgeByMission {
  id: number;
  user_uid: string;
  bigCategory: string;
  smallCategory: string;
}

const Badges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const params = useParams();
  const searchId = decodeURIComponent(`${params.id}`);

  const [badgeByMission, setBadgeByMission] = useState<BadgeByMission[]>([]);
  const [badgesByMissionCount, setBadgesByMissionCount] = useState<number>(0);

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
  ///===================👇동준작업👇=========================================================
  const fetchBadgesByMission = async (user: any) => {
    console.log("미션의 유저===>", user[0]);
    const { data: badgeData2, count } = await supabase
      .from("missionList")
      .select("*", { count: "exact" })
      .eq("user_uid", user[0]?.uid)
      .eq("doingYn", false);
    console.log("badgeData2====>", badgeData2);
    if (badgeData2 !== null && count !== null) {
      setBadgeByMission(badgeData2);
      setBadgesByMissionCount(count);
    }
  };
  ///===================👆동준작업👆=========================================================
  const fetchUser = async () => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("nickname", searchId);

    fetchBadges(data);
    fetchBadgesByMission(data);
  };

  const shareBadge = badges.find((item) => item.badge_title === "share");
  const threeShareBadge =
    badges.filter((item) => item.badge_title === "share").length >= 30;

  const likeBadge = badges.find((item) => item.badge_title === "like");
  const threeLikeBadge =
    badges.filter((item) => item.badge_title === "like").length >= 30;

  ///===================👇동준작업👇=========================================================
  /*
  const recipePostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "레시피")
  const restaurantPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "식당")
  const productPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "제품")
  const ohjiwanPostBadge = badges2.find((item) => item.bigCategory === "글쓰기" && item.smallCategory === "오지완")
  */
  //  const bronzeTrophy
  const firstMission = badgesByMissionCount >= 1;
  //아래 뱃지 얻는 조건은 추후에 수정해야 함.
  const bronzeTrophy = badgesByMissionCount >= 10;
  const silverTrophy = badgesByMissionCount >= 20;
  const goldTrophy = badgesByMissionCount >= 30;
  ///===================👆동준작업👆=========================================================
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    // <div className="grid grid-cols-3 gap-4 w-full h-full">
    <div className="flex flex-col w-[317.5px] items-start gap-[30px] ">
      <div className="flex justify-between items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
<<<<<<< HEAD
          {bronzeTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/true.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS90cnVlLnN2ZyIsImlhdCI6MTY5MzQ1NjI2NywiZXhwIjoxNjk2MDQ4MjY3fQ.VOB1STTxO1I0y6VAbEiTtaDVplvFiUOYyVt6-cLW_Jg&t=2023-08-31T04%3A31%3A05.175Z"
=======
          {badges ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/01sproutsaver.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wMXNwcm91dHNhdmVyLnN2ZyIsImlhdCI6MTY5MzQ2NTYzNywiZXhwIjoxNjk2MDU3NjM3fQ.y9emdOUGzuWiaGTUZDAorTZa6-ezqX_VqwXMHbZgspY&t=2023-08-31T07%3A07%3A17.651Z"
>>>>>>> f7de48ef8d3436736eb7e896c6e0c2969f853fd3
              />
              <p className="badge-text">
                새싹 세이버
              </p>
            </>
          ) : (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/01falsesproutsaver.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wMWZhbHNlc3Byb3V0c2F2ZXIuc3ZnIiwiaWF0IjoxNjkzNDc3OTY2LCJleHAiOjE2OTYwNjk5NjZ9.Ka9dv9qJiO9Ze1y-_sRiXk5VAz7wU9mxkxmKxTHk4yE&t=2023-08-31T10%3A32%3A46.858Z"
              />
              <p className="badge-text">
                새싹 세이버
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
<<<<<<< HEAD
          {silverTrophy ? (
=======
          {shareBadge ? (
>>>>>>> f7de48ef8d3436736eb7e896c6e0c2969f853fd3
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/02sharer.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wMnNoYXJlci5zdmciLCJpYXQiOjE2OTM0NTY1MjksImV4cCI6MTY5NjA0ODUyOX0.KfrCBVAHtMxjhskL_Dv4PbijPkbczdS0R2pVaFLOhJI&t=2023-08-31T04%3A35%3A27.744Z"
              />
              <p className="badge-text">
                나눔꾼
              </p>
            </>
          ) : (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/02falsesharer.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wMmZhbHNlc2hhcmVyLnN2ZyIsImlhdCI6MTY5MzQ3Nzk4MiwiZXhwIjoxNjk2MDY5OTgyfQ.rKVIXFoC28devo6HEr-cFGVYgQfI82r9egdLbmEPGVM&t=2023-08-31T10%3A33%3A02.378Z"
              />
              <p className="badge-text">
                나눔꾼
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
<<<<<<< HEAD
          {goldTrophy ? (
=======
          {threeShareBadge ? (
>>>>>>> f7de48ef8d3436736eb7e896c6e0c2969f853fd3
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/03gongyou.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wM2dvbmd5b3Uuc3ZnIiwiaWF0IjoxNjkzNDU2NTYwLCJleHAiOjE2OTYwNDg1NjB9.h3cJcTw5LDX9yOMI4ZV8kbsVC4BWGW3BF5B7p34KzuU&t=2023-08-31T04%3A35%3A58.235Z"
              />
              <p className="badge-text">
                공.유
              </p>
            </>
          ) : (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/03falsegongyou.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wM2ZhbHNlZ29uZ3lvdS5zdmciLCJpYXQiOjE2OTM0NzgwMDQsImV4cCI6MTY5NjA3MDAwNH0.FVmBhiR5gHPhljvXFnckJU_qZpENqUpSMqijPp-6sLs&t=2023-08-31T10%3A33%3A24.026Z"
              />
              <p className="badge-text">
                공.유
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
<<<<<<< HEAD
          {bronzeTrophy ? (
=======
          {likeBadge ? (
>>>>>>> f7de48ef8d3436736eb7e896c6e0c2969f853fd3
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/04lover.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wNGxvdmVyLnN2ZyIsImlhdCI6MTY5MzQ1NjU3NSwiZXhwIjoxNjk2MDQ4NTc1fQ.mItBURw24ysbOAl55u0E0nhKjZBXJyglyMolKoVp_yk&t=2023-08-31T04%3A36%3A14.025Z"
              />
              <p className="badge-text ">
                사랑꾼
              </p>
            </>
          ) : (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/04falselover.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wNGZhbHNlbG92ZXIuc3ZnIiwiaWF0IjoxNjkzNDc4MDIzLCJleHAiOjE2OTYwNzAwMjN9.PguP1om9pw4-iL9_SP7m7k093ZOo4ymHFbuOt1J8JAs&t=2023-08-31T10%3A33%3A43.732Z"
              />
              <p className="badge-text ">
                사랑꾼
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
<<<<<<< HEAD
          {silverTrophy ? (
=======
          {threeLikeBadge ? (
>>>>>>> f7de48ef8d3436736eb7e896c6e0c2969f853fd3
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/05reallover.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wNXJlYWxsb3Zlci5zdmciLCJpYXQiOjE2OTM0NTY1ODgsImV4cCI6MTY5NjA0ODU4OH0.d488tll3m7OBYfVScktw9ZokucBxYBO3xcqDFncIjBQ&t=2023-08-31T04%3A36%3A27.059Z"
              />
              <p className="badge-text ">
                찐 사랑꾼
              </p>
            </>
          ) : (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/05falsereallover.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wNWZhbHNlcmVhbGxvdmVyLnN2ZyIsImlhdCI6MTY5MzQ3ODAzNiwiZXhwIjoxNjk2MDcwMDM2fQ.cvAxtPBIi3e-7UTItEGOnEsTgSRgbfqvjO1E8AsQ_ek&t=2023-08-31T10%3A33%3A56.581Z"
              />
              <p className="badge-text ">
                찐 사랑꾼
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
<<<<<<< HEAD
          {goldTrophy ? (
=======
          {firstMission ? (
>>>>>>> f7de48ef8d3436736eb7e896c6e0c2969f853fd3
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/06fisrtmission.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wNmZpc3J0bWlzc2lvbi5zdmciLCJpYXQiOjE2OTM0NTY2MDIsImV4cCI6MTY5NjA0ODYwMn0.svP1Nr8pLdL6eQwsVcQaARHlf4Mcyr0Fw39M48qD5kE&t=2023-08-31T04%3A36%3A40.254Z"
              />
              <p className="badge-text">
                첫 미션
              </p>
            </>
          ) : (
<<<<<<< HEAD
            <p>"아직 [첫 미션] 배지를 획득하지 못했습니다."</p>
=======
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/06falsefirstmission.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wNmZhbHNlZmlyc3RtaXNzaW9uLnN2ZyIsImlhdCI6MTY5MzQ3ODA3MywiZXhwIjoxNjk2MDcwMDczfQ.B4Hf7XmiMZnv3I_f7pMyUSYAronGHsO4rEhS6OycXJw&t=2023-08-31T10%3A34%3A33.019Z"
              />
              <p className="badge-text">
                첫 미션
              </p>
            </>
>>>>>>> f7de48ef8d3436736eb7e896c6e0c2969f853fd3
          )}
        </div>
      </div>
      <div className="flex justify-between items-start self-stretch">
        <div className="flex flex-col items-center gap-2">
          {bronzeTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/07missionhunter.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wN21pc3Npb25odW50ZXIuc3ZnIiwiaWF0IjoxNjkzNDU2NjE4LCJleHAiOjE2OTYwNDg2MTh9.yoiQ9I0Vy_o7OapvJVN6_n3DfuwedBVijFfj24pn0yc&t=2023-08-31T04%3A36%3A56.455Z"
              />
              <p className="badge-text ">
                미션 헌터
              </p>
            </>
          ) : (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/07falsemissionhunter.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wN2ZhbHNlbWlzc2lvbmh1bnRlci5zdmciLCJpYXQiOjE2OTM0NzgwOTAsImV4cCI6MTY5NjA3MDA5MH0.C-39d8jnNM2S0r4ExwukUWAi0DTjKwid8foBjgAuPjQ&t=2023-08-31T10%3A34%3A50.132Z"
              />
              <p className="badge-text ">
                미션 헌터
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {silverTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/08missionpro.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wOG1pc3Npb25wcm8uc3ZnIiwiaWF0IjoxNjkzNDU2NjI4LCJleHAiOjE2OTYwNDg2Mjh9.h8E9dRrrfCkj0cnG2xuiZArTwL6AMQNm4U6vcZ3ehQc&t=2023-08-31T04%3A37%3A06.666Z"
              />
              <p className="badge-text ">
                미션 프로
              </p>
            </>
          ) : (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/08falsefalsemissionpro.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wOGZhbHNlZmFsc2VtaXNzaW9ucHJvLnN2ZyIsImlhdCI6MTY5MzQ3ODEwNiwiZXhwIjoxNjk2MDcwMTA2fQ.i9i1p9QpToFkkPZfDnuy9-97Gf7jbxYKEOjNp92vRGE&t=2023-08-31T10%3A35%3A06.410Z"
              />
              <p className="badge-text ">
                미션 프로
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {goldTrophy ? (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/09missionmaster.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS8wOW1pc3Npb25tYXN0ZXIuc3ZnIiwiaWF0IjoxNjkzNDU2NjM3LCJleHAiOjE2OTYwNDg2Mzd9.CCH2fG720Ue6L7_2SkSimaR9gcN1g4BlH8pTzCp_V7Q&t=2023-08-31T04%3A37%3A15.569Z"
              />
              <p className="badge-text ">
                미션 마스터
              </p>
            </>
          ) : (
            <>
              <img
                className="badge-image"
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/sign/badge/false/09falsefalsemissionmaster.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiYWRnZS9mYWxzZS8wOWZhbHNlZmFsc2VtaXNzaW9ubWFzdGVyLnN2ZyIsImlhdCI6MTY5MzQ3ODEyNCwiZXhwIjoxNjk2MDcwMTI0fQ.GErEqFTHPdubAUPf43SZcT2GoJrAcwT-AXFZmjVnObo&t=2023-08-31T10%3A35%3A24.339Z"
              />
              <p className="badge-text ">
                미션 마스터
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Badges;
