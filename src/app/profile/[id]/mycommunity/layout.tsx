import Link from "next/link";
import { Router } from "next/router";
import CommunityTopBar from "./components/CommunityTopBar";
CommunityTopBar

export default function MycommunityLayout ({
  children,
}: {
  children: React.ReactNode;
}) 

{
  return (
    <div className="flex flex-col w-[789px] p-8 items-start gap-6 shrink-0 self-stretch bg-white rounded-2xl">
        <h1 className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">커뮤니티 활동</h1>
        <div className="flex gap-10 ">
        <CommunityTopBar/>
      </div>
      {/* <section className="border-dashed border-2 border-indigo-600 h-3/4 overflow-y-auto">{children}</section> */}
      <section className="h-3/4 w-full">{children}</section>
    </div>
  );
}