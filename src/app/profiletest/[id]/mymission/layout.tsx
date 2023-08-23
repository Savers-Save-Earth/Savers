import Link from "next/link";
import { Router } from "next/router";

export default function MymissionLayout ({
  children,
}: {
  children: React.ReactNode;
}) 

{
  const searchId = children!.props.segmentPath[3][1]
  // console.log("children.props.mission+++==>",searchId)
  return (
    <div className="h-screen">
        <h1>마이미션 레이아웃</h1>
        <div className="flex gap-10">
        <Link
          href={`/profiletest/${searchId}/mymission/missiondoing`}
        >
          진행중인 미션
        </Link>
        <Link
          href={`/profiletest/${searchId}/mymission/missiondone`}
        >
          완료한 미션
        </Link>
      </div>
      <section className="border-dashed border-2 border-indigo-600">{children}</section>
    </div>
  );
}