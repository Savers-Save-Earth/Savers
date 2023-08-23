import Link from "next/link";
import { Router } from "next/router";

export default function ProfiletestLayout ({
  children,
}: {
  children: React.ReactNode;
}) 

{
  return (
    <div className="flex gap-2 h-screen">
      <div className="w-1/4 p-4 border-dashed border-2 border-indigo-600 flex flex-col">
        <h1>프로필테스트 레이아웃</h1>
        <Link
          href={"/profiletest/temporaltestuid/myprofile"}
        >
          나의 프로필
        </Link>
        <Link
          href={"/profiletest/temporaltestuid/mymission"}
        >
          나의 미션
        </Link>
        <Link
          href={"/profiletest/temporaltestuid/mycommunity"}
        >
          커뮤니티 활동
        </Link>
      </div>
      <section className="w-3/4 p-4 border-dashed border-2 border-red-600 flex">{children}</section>
    </div>
  );
}
