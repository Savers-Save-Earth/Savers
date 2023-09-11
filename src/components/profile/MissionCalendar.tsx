import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import RandomMission from "@/app/profile/components/RandomMission";
import { MissionListType } from "@/types/types";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MissionCalendar = ({ profileData, missionDone }: any) => {
  const [value, onChange] = useState<Value>(new Date());
  const [mission, setMission] = useState<MissionListType[]>([]);
  const params = useParams();
  

  // const [showModal, setShowModal] = useState(false);
  // const [profile, setProfile] = useState<any>([]);
  // const [user, setUser] = useState<any>();
  // const searchId = params.id;

  //추후에 useAuth hoo으로 바꿔줘야 함.
  // const getUser = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   if (!user) {
  //     setUser(false);
  //   } else {
  //     setUser(user);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);

  // const fetchMissionList = async () => {
  //   const { data: missionData } = await supabase
  //     .from("missionList")
  //     .select()
  //     .eq("user_uid", searchId)
  //     .eq("doingYn", false);

  //   if (missionData !== null) {
  //     setMission(missionData);
  //   }
  // };

  //   const getProfile = async () => {
  //   let { data: user, error } = await supabase
  //     .from("user")
  //     .select("*")
  //     .eq("uid", searchId);
  //   return user![0];
  // };
  
  useEffect(() => {
    // fetchMissionList();
    if (missionDone !== null) {
      setMission(missionDone);
    } else {
      setMission([]);
    }
  }, []);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const fetchedProfile = await getProfile();
  //     setProfile(fetchedProfile);
  //   };
  //   fetchProfile();
  // }, [searchId]);
  const marks: string[] = [];
  mission.map((item) => marks.push(`${item.createdAt}`));
  return (
    <div className="bg-neutral-100 rounded-[10px] w-full ">
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        locale="ko-KO"
        calendarType="US" // 요일을 일요일부터 시작하도록 설정
        className="mx-auto w-full text-sm border-b "
        formatDay={(locale, date) => format(date, "d")} // 일 제외하고 숫자만 보임
        tileClassName={({ date, view }) => {
          if (marks.find((item) => item === format(date, "yyyy-MM-dd"))) {
            return "highlight";
          }
        }}
      />
      {/* {user && profile.uid === user.id && ( */}
      <>
        {/* sidebar와 보이는 창 z index 문제 해결될 때까지 봉인 */}
        {/* <p
      style={{
        background: "rgb(245, 245, 245)",
        textAlign: "center",
        color: "gray",
        padding: "15px 0 15px 0",
        borderRadius: "10px",
        cursor: "pointer",
      }}
      onClick={() => setShowModal(true)}
    >
      일일미션 하러가기
    </p>
    <RandomMission showModal={showModal} user={user} setShowModal={setShowModal} profile={profile} /> */}
      </>
      {/* )} */}
    </div>
  );
};

export default MissionCalendar;
