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
    <div className="w-[789px] flex flex-col items-start gap-6 shrink-0 self-stretch rounded-2xl">
        <h1 className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">나의 미션</h1>
        <div className="flex gap-10 ">
        <MyMissionTopBar/>
      </div>
      <section className="">{children}</section>
    </div>
  );
}