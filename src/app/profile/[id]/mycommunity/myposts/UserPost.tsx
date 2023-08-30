import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";

export default function UserPost({ post }: any) {
  const [commentsNum, setCommentsNum] = useState(0);
  const [likesNum, setLikesNum] = useState(0);
  useEffect(() => {
    const getCommentsNum = async (postUid: string) => {
      const { count } = await supabase
        .from("community_comment")
        .select("*", { count: "exact" })
        .eq("post_uid", postUid);
      setCommentsNum(count || 0);
      return count;
    };
    const getLikesNum = async (postUid: string) => {
      const { count } = await supabase
        .from("like_post")
        .select("*", { count: "exact" })
        .eq("post_uid", postUid);
      setLikesNum(count || 0);
      return count;
    };

    getCommentsNum(post.post_uid);
    getLikesNum(post.post_uid);
  }, []);
  return (
    <div
      className="flex flex-col items-start p-6 gap-4 self-stretch rounded-2xl bg-white border border-gray-200"
      key={post.post_uid}
    >
      <div className="flex items-center gap-2 self-stretch">
        <div className="flex px-2 py-1 justify-center items-center rounded-2xl bg-gray-50">
          <p className="text-gray-400 text-[12px] font-normal leading-3">
            {post.category}
          </p>
        </div>
        <div className="flex-[1,0,0%]">
          <p
            className="overflow-hidden text-gray-900 text-ellipsis text-[16px] font-semibold leading-4 cursor-pointer hover:underline"
            onClick={() => window.open(`/community/${post.post_uid}`)}
          >
            {post.title}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center self-stretch text-gray-400">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            <span className="text-[14px] leading-[14px] font-normal">
              {likesNum}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
            <span className="text-[14px] leading-[14px] font-normal">
              {commentsNum}
            </span>
          </div>
        </div>
        <p>등록일&nbsp;{post.created_date.slice(0, 10)}</p>
      </div>
    </div>
  );
}
