"use client";
import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import { format } from "date-fns"; // date-fns의 format 함수를 import

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MissionCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        showNeighboringMonth={false}
        className="mx-auto w-full text-sm border-b"
        formatDay={(locale, date) => format(date, "d")}
      />
    </div>
  );
};

export default MissionCalendar;
