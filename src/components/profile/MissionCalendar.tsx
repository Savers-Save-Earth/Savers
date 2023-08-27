import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const marks = ["2023-08-24"];

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
          const formattedDate = format(date, "yyyy-MM-dd");
          if (marks.includes(formattedDate)) {
            return "highlight";
          }
        }}
      />
    </div>
  );
};

export default MissionCalendar;
