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
    <div className="h-screen">
        <h1>마이미션 레이아웃</h1>
        <div className="flex gap-10">
        {/* <Link
          href={`/profiletest/${searchId}/mymission/missiondoing`}
        >
          진행중인 미션
        </Link>
        <Link
          href={`/profiletest/${searchId}/mymission/missiondone`}
        >
          완료한 미션
        </Link> */}
        <MyMissionTopBar/>
      </div>
      <section className="border-dashed border-2 border-indigo-600">{children}</section>
    </div>
  );
}