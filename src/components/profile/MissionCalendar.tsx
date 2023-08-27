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
  console.log(mission);
  mission.map((item) => marks.push(`${item.createdAt}`));
  console.log(marks);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        locale="ko-KO"
        className="mx-auto w-full text-sm border-b "
        formatDay={(locale, date) => format(date, "dd")}
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
