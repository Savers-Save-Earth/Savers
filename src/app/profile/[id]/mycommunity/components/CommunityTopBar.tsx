"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CommunityTopBar = () => {
  const searchId = useParams().id as string;
  const router = useRouter();

  return (
    <div className="flex items-start gap-8 self-stretch">
      <div className="flex flex-col items-start py-[6.5px] gap-[13px] self-stretch">
        <button
          className="btn-profile-topbar"
          onClick={() =>
            router.push(`/profile/${searchId}/mycommunity/myposts`)
          }
        >
          내가 쓴 글
        </button>
      </div>

      <div className="flex flex-col items-start py-[6.5px] gap-[13px] self-stretch">
        <button
          className="btn-profile-topbar"
          onClick={() =>
            router.push(`/profile/${searchId}/mycommunity/mycomments`)
          }
        >
          내가 쓴 댓글
        </button>
      </div>
      <div className="flex flex-col items-start py-[6.5px] gap-[13px] self-stretch">
        <button
          className="btn-profile-topbar"
          onClick={() =>
            router.push(`/profile/${searchId}/mycommunity/mylikedposts`)
          }
        >
          내가 북마크한 글
        </button>
      </div>
    </div>
  );
};
export default CommunityTopBar;
