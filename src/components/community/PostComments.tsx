"use client";
import { createComment, deleteComment, getComments, updateComment } from "@/api/community/comment";
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
type EditCommentType = Database["public"]["Tables"]["community_comment"]["Update"];

const PostComments = () => {
  const { postUid } = useParams() as { postUid: string; };
  const { data: comments } = useQuery<CommentType[]>(
    ["comments", postUid],
    () => getComments(postUid),
  );

  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleNewInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.currentTarget.value);
  };

  // 댓글 등록 mutation
  const queryClient = useQueryClient();
  const createMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postUid] });
      window.alert("댓글이 정상적으로 등록되었습니다.");
      setNewComment("");
    },
    onError: (error) => {
      console.error("댓글 등록 에러:", error);
      window.alert("댓글이 정상적으로 등록되지 않았습니다. 다시 시도해주세요!");
    },
  })

  // 댓글 등록 submit handler
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const writtenTime = new Date();
    const commentData: NewCommentType = {
      content: newComment,
      post_uid: postUid,
      writer_uid: "bd2125b8-d852-485c-baf3-9c7a8949beee",
      writer_name: "테스트닉네임",
      created_date: convertTimestamp(writtenTime),
      updated_date: convertTimestamp(writtenTime)
    }
    createMutation.mutate(commentData);
    setNewComment("");
  }
  

  // 댓글 삭제 mutation
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postUid] });
      window.alert("댓글이 정상적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("댓글 삭제 에러:", error);
      window.alert("댓글글이 정상적으로 삭제되지 않았습니다. 다시 시도해주세요!");
    },
  });

  // 댓글 삭제 submit handler
  const handleDelete = (commentUid: string) => {
    const ok = window.confirm("댓글을 정말 삭제하시겠습니까?");
    if (!ok) return false;
    deleteMutation.mutate(commentUid);
  };

  // 댓글 수정 mutation
  const updateMutation = useMutation(updateComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postUid] });
      console.log("댓 수정 onSuccess data >> ", data);
      window.alert("댓글이 정상적으로 수정되었습니다.");
    },
    onError: (error) => {
      console.error("댓글 수정 에러:", error);
      window.alert("댓글글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!");
    },
  });

  const handleEditInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditingComment(e.currentTarget.value);
  };

  // 댓글 수정 상태 handler
const handleEditState = (commentUid: string) => {
  const commentToEdit = comments?.find((comment) => comment.comment_uid === commentUid);
  if (commentToEdit) {
    setEditingComment(commentToEdit.content); // setEditingComment로 변경
    setEditingCommentId(commentUid);
  }
};

  // 댓글 수정 취소 시 수정 모드 종료
  const handleCancelEdit = () => {
    setEditingComment("");
    setEditingCommentId(null);
  };

  // 댓글 수정 submit handler
  const handleSaveEdit = (commentUid: string) => {
    const writtenTime = new Date();
    const editCommentData: EditCommentType = {
      comment_uid: commentUid,
      content: editingComment,
      writer_name: "수정 닉네임",
      updated_date: convertTimestamp(writtenTime),
    }
    updateMutation.mutate(editCommentData);
    setEditingComment("");
    setEditingCommentId(null);
  };
  

  return (
    <>
      <div className="flex flex-col max-w-7xl mt-10 px-10 mx-auto">
        <span>댓글 {comments ? comments.length : 0}개</span>
        {comments?.map((comment: CommentType) => (
          <div
            key={comment.comment_uid}
            className="bg-gray-100 flex flex-col mt-5 px-2 py-14 border rounded-md"
          >
            <div className="flex justify-between">
              <span>작성자 : {comment.writer_name}</span>
              <div className="flex space-x-3 mr-2">
                {editingCommentId === comment.comment_uid ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(comment.comment_uid)}>
                      저장
                    </button>
                    <button onClick={handleCancelEdit}>
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditState(comment.comment_uid)}>수정</button>
                    <button onClick={() => handleDelete(comment.comment_uid)}>삭제</button>
                  </>
                )}
              </div>
            </div>
            {editingCommentId === comment.comment_uid ? (
              <textarea
                value={editingComment}
                onChange={handleEditInputChange}
                rows={4}
                className="px-4 py-2 pb-5 border focus:outline-none resize-none"
              />
            ) : (
              <p>{comment.content}</p>
            )}
            <span>작성시간 : {comment.updated_date}</span>
          </div>
        ))}
        {/* ------- 새 댓글 등록 textarea -------  */}
        <div className="relative flex flex-col mt-5 space-y-3">
          <span className="absolute top-6 left-4 font-semibold">닉네임</span>
          <textarea
            id="commentInput"
            placeholder="댓글을 입력하세요."
            rows={4}
            value={newComment}
            onChange={handleNewInputChange}
            maxLength={300}
            className="px-4 pt-12 pb-5 border focus:outline-none resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={newComment.length === 0}
            className={tailwindClsNames("absolute bottom-3 right-3 px-4 py-1 rounded-md",
              newComment.length === 0
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