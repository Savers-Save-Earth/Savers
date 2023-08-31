import Link from "next/link";
import { Router } from "next/router";
import MyMissionTopBar from "./components/MyMissionTopBar";

export default function MymissionLayout ({
  children,
}: {
  children: React.ReactNode;
}) 

{

  return (
    <div className="w-full h-full space-y-6">
        <h1 className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">마이미션 레이아웃</h1>
        <div className="flex gap-10">
        <MyMissionTopBar/>
      </div>
      <section>{children}</section>
    </div>
  );
}