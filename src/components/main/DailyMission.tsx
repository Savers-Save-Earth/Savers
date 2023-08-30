import React from "react";

const DailyMission = () => {
  return (
    <div
      className="flex items-center justify-between w-full rounded-2xl p-8 mb-16"
      style={{ background: "#5FD100" }}
    >
      <div>
        <span className="text-white text-[20px]">지구를 지키는</span>
        <br />
        <span className="font-bold text-white text-[20px]">
          일일미션 랜덤 뽑기
        </span>
      </div>
      <img
        src="/assets/arrow_right.png"
        className="inline-block"
        style={{ verticalAlign: "middle" }}
      />
    </div>
  );
};

export default DailyMission;
