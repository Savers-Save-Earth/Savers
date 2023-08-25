"use client";
import { createComment, getComments } from "@/api/community/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Database } from "@/types/supabase";
import { convertTimestamp } from "@/libs/util";

const tailwindClsNames = (...classnames: string[]) => {
  return classnames.join(" ");
}

type CommentType = Database["public"]["Tables"]["community_comment"]["Row"];
type NewCommentType = Database["public"]["Tables"]["community_comment"]["Insert"];

const PostComments = () => {
  const { postUid } = useParams() as { postUid: string; };
  const { data: comments } = useQuery<CommentType[]>(
    ["comments", postUid],
    () => getComments(postUid),
  );

  const [comment, setComment] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };

  const queryClient = useQueryClient();
  const createMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityAllPosts"] });
      window.alert("댓글이 정상적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.error("게시글 등록 에러:", error);
      window.alert("게시글이 정상적으로 등록되지 않았습니다. 다시 시도해주세요!");
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const writtenTime = new Date();
    const newComment: NewCommentType = {
      content: comment,
      post_uid: postUid,
      writer_uid: "bd2125b8-d852-485c-baf3-9c7a8949beee",
      writer_name: "테스트닉네임",
      created_date: convertTimestamp(writtenTime),
      updated_date: convertTimestamp(writtenTime)
    }

    createMutation.mutate(newComment);
  }

  return (
    <>
      <div className="flex flex-col max-w-7xl mt-10 px-10 mx-auto">
        <span>댓글 {comments ? comments.length : 0}개</span>
        {comments?.map((comment: CommentType) => (
          <div
            key={comment.comment_uid}
            className="bg-gray-100 flex flex-col mt-5 px-2 py-14 border rounded-md">
            <div className="flex justify-between">
              <span>작성자 : {comment.writer_name}</span>
              <span>작성시간 : {comment.updated_date}</span>
            </div>
            <p>{comment.content}</p>
          </div>
        )
        )}
        <div className="relative flex flex-col mt-5 space-y-3">
          <span className="absolute top-6 left-4 font-semibold">닉네임</span>
          <textarea
            id="commentInput"
            placeholder="댓글을 입력하세요."
            rows={4}
            value={comment}
            onChange={handleInputChange}
            maxLength={300}
            className="px-4 pt-12 pb-5 border focus:outline-none resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={comment.length === 0}
            className={tailwindClsNames("absolute bottom-3 right-3 px-4 py-1 rounded-md",
              comment.length === 0
                ? "text-gray-200"
                : "bg-slate-200"
            )}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
};

export default PostComments;
