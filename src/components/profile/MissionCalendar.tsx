import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// 미션 완료 이후, 해당 유저가 완료한 date 를 가져오는 로직만 짜면 될듯
const marks = ["2023-08-22", "2023-08-23", "2023-08-24"];

const MissionCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        locale="ko-KO"
        className="mx-auto w-full text-sm border-b"
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
