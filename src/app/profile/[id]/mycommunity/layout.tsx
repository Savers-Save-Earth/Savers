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
    <div className="w-full h-full space-y-6">
        <h1 className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">커뮤니티 활동</h1>
        <CommunityTopBar/>
      {/* <section className="border-dashed border-2 border-indigo-600 h-3/4 overflow-y-auto">{children}</section> */}
      <section>{children}</section>
    </div>
  );
}