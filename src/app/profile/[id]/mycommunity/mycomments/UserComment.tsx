import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type PostType = Database["public"]["Tables"]["community"]["Row"];

export default function UserComment({ comment }: any) {
  const [commentPost, setCommentPost] = useState<PostType[]>([]);
  useEffect(() => {
    const getPostDetail = async (post_uid: string) => {
      const { data: commentedPost } = await supabase
        .from("community")
        .select("*")
        .eq("post_uid", post_uid);

      if (commentedPost!.length === 0) {
        setCommentPost([]);
      } else {
        setCommentPost(commentedPost!);
      }
    };
    getPostDetail(comment.post_uid);
  }, []);

  return (
    <div
      className="flex flex-col items-start p-6 gap-4 self-stretch rounded-2xl bg-white border border-gray-200"
      key={comment.comment_uid}
    >
      <div className="flex items-center gap-2 self-stretch hover:underline">
        <div className="flex-[1,0,0%]">
          <p
            className="overflow-hidden text-gray-900 text-ellipsis text-[16px] font-semibold leading-4 cursor-pointer"
            onClick={() =>
              window.open(`/community/${commentPost[0]!.post_uid}`)
            }
          >
            {/* md 이하의 크기에서만 글자수를 8자로 제한하고 '...'을 표시 : lg는 css용어이기 때문에 템플릿 리터럴로 조건을 주려면 */}
            {/* 직접 브라우저 너비를 지칭하는 window.innerWidth를 조건분기로 사용해야 한다. */}
            {window.innerWidth < 768
              ? comment.content.length > 15
                ? comment.content.slice(0, 15) + "..."
                : comment.content
              : comment.content}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between lg:items-center self-stretch text-gray-400">
        {commentPost.length > 0 ? (
          <div className="flex items-center gap-2 text-[0.8rem] font-normal">
            {commentPost[0].title} [{commentPost[0].number_comments}]
          </div>
        ) : (
          ""
        )}
        <p className="flex items-center gap-2 text-[0.8rem] xl:text-[1rem] font-normal">
          <span className="hidden lg:inline-block">등록일&nbsp;</span>
          {comment.created_date.slice(0, 10)}
        </p>
      </div>
    </div>
  );
}
