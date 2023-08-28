import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Mission {
  id: number;
  userId: string;
  doingYn: boolean;
  createdAt: string;
}

const MissionCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [mission, setMission] = useState<Mission[]>([]);
  const params = useParams();
  const searchId = decodeURIComponent(`${params.id}`);
  console.log(searchId);

  const fetchMissionList = async () => {
    const { data: missionData } = await supabase
      .from("missionList")
      .select()
      .eq("userId", searchId)
      .eq("doingYn", false);

    if (missionData !== null) {
      setMission(missionData);
    }
  };

  useEffect(() => {
    fetchMissionList();
  }, []);

  const marks: string[] = [];
  mission.map((item) => marks.push(`${item.createdAt}`));

  return (
    <div style={{ background: "rgb(245, 245, 245)", borderRadius: "10px" }}>
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
      <p
        style={{
          background: "rgb(245, 245, 245)",
          textAlign: "center",
          color: "gray",
          padding: "15px 0 15px 0",
          borderRadius: "10px",
        }}
      >
        일일미션 하러가기
      </p>
    </div>
  );
};

export default MissionCalendar;
