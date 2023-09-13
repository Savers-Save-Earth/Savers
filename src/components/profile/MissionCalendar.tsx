import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { MissionListType } from "@/types/types";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MissionCalendar = ({ profileData, missionDone }: any) => {
  const [value, onChange] = useState<Value>(new Date());
  const [mission, setMission] = useState<MissionListType[]>([]);
  
  useEffect(() => {
    if (missionDone !== null) {
      setMission(missionDone);
    } else {
      setMission([]);
    }
  }, []);

  const marks: string[] = [];
  mission.map((item) => marks.push(`${item.createdAt}`));
  return (
    <div className="bg-neutral-100 rounded-[10px] w-full h-full ">
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
    </div>
  );
};

export default MissionCalendar;
