import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type PostType = Database["public"]["Tables"]["community"]["Row"];

export default function UserComment({ comment }: any) {
  const [commentPost, setCommentPost] = useState<PostType[]>([]);
  useEffect(() => {
    const getPostDetail = async (post_uid: string) => {
      console.log("post_uid==>", post_uid);
      const { data: commentedPost } = await supabase
        .from("community")
        .select("*")
        .eq("post_uid", post_uid);
      console.log("postTitle==>", commentedPost);
      if (commentedPost!.length === 0) {
        setCommentPost([])
      }
      else {
        setCommentPost(commentedPost!)
      }
    };
    getPostDetail(comment.post_uid);
  }, []);
  console.log("commentPost===",commentPost)
  return (
    <div
      className="flex flex-col items-start p-6 gap-4 self-stretch rounded-2xl bg-white border border-gray-200"
      key={comment.comment_uid}
    >
      <div className="flex items-center gap-2 self-stretch hover:underline">
        <div className="flex-[1,0,0%]">
          <p
            className="overflow-hidden text-gray-900 text-ellipsis text-[16px] font-semibold leading-4 cursor-pointer"
            onClick={() => window.open(`/community/${commentPost[0]!.post_uid}`)}
          >
            {comment.content}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center self-stretch text-gray-400">
        {commentPost.length > 0 ? <div className="flex items-center gap-2 text-[14px] leading-[14px] font-normal">{commentPost[0].title} [{commentPost[0].number_comments}]</div> : ""}
        <p>등록일&nbsp;{comment.created_date.slice(0, 10)}</p>
      </div>
    </div>
  );
}
