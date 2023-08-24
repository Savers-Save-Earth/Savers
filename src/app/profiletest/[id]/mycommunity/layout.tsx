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
    <div className="h-screen">
        <h1>마이커뮤니티 레이아웃</h1>
        <div className="flex gap-10">
        {/* <Link
          href={`/profiletest/${searchId}/mycommunity/myposts`}
        >
          내가 쓴 글
        </Link>
        <Link
          href={`/profiletest/${searchId}/mycommunity/mycomments`}
        >
          내가 쓴 댓글
        </Link> */}
        <CommunityTopBar/>
      </div>
      <section className="border-dashed border-2 border-indigo-600">{children}</section>
    </div>
  );
}