"use client";
import { createComment, deleteComment, getComments, updateComment } from "@/api/community/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Database } from "@/types/supabase";
import { convertTimestamp } from "@/libs/util";
import { useAuth } from "@/hooks/useAuth";

const cls = (...classnames: string[]) => {
  return classnames.join(" ");
}

type CommentType = Database["public"]["Tables"]["community_comment"]["Row"];
type NewCommentType = Database["public"]["Tables"]["community_comment"]["Insert"];
type EditCommentType = Database["public"]["Tables"]["community_comment"]["Update"];

const PostComments = () => {
  const currentUser = useAuth();
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
      writer_uid: currentUser?.uid,
      writer_name: currentUser?.nickname as string,
      created_date: convertTimestamp(writtenTime),
      updated_date: convertTimestamp(writtenTime),
      isDeleted: false,
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
      window.alert("댓글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!");
    },
  });

  const handleEditInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditingComment(e.currentTarget.value);
  };

  // 댓글 수정 상태 handler
const handleEditState = (commentUid: string) => {
  const commentToEdit = comments?.find((comment) => comment.comment_uid === commentUid);
  if (commentToEdit) {
    setEditingComment(commentToEdit.content);
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
      writer_name: currentUser?.nickname,
      updated_date: convertTimestamp(writtenTime),
    }
    updateMutation.mutate(editCommentData);
    setEditingComment("");
    setEditingCommentId(null);
  };
  
  return (
    <>
      <div className="mb-10 flex flex-col max-w-7xl px-10 mx-auto">
        <div className="border-b py-4">
          <span>댓글 {comments ? comments.length : 0}개</span>
        </div>
        {comments?.map((comment: CommentType) => (
          <div
            key={comment.comment_uid}
            className="flex flex-col px-8 py-4 border-b"
          >
            <div className="flex justify-between mb-2">
              <div className="flex flex-col">
                <span>{comment.writer_name}</span>
                <span className="text-sm text-gray-400">{comment.updated_date}</span>
              </div>
              <div className="flex space-x-3 mr-2">
                {currentUser?.uid === comment.writer_uid && (
                  <div className="space-x-2">
                    {editingCommentId === comment.comment_uid ? (
                      <>
                        <button onClick={() => handleSaveEdit(comment.comment_uid)}>저장</button>
                        <button onClick={handleCancelEdit}>취소</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditState(comment.comment_uid)}>수정</button>
                        <button onClick={() => handleDelete(comment.comment_uid)}>삭제</button>
                      </>
                    )}
                  </div>
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
              <>
                <p>{comment.content}</p>
                <div className="mt-2">
                  <button className="text-gray-400 text-sm">답글</button>
                </div>
              </>
            )}
          </div>
        ))}
        {/* ------- 새 댓글 등록 textarea -------  */}
        <div className="relative flex flex-col mt-5 space-y-3">
          {currentUser ? <span className="absolute top-6 left-4 font-semibold bg-white">{currentUser?.nickname}</span> : null}
          <textarea
            id="commentInput"
            placeholder={currentUser ? "댓글을 입력하세요." : "댓글을 등록하려면 로그인 해주세요."}
            disabled={!currentUser}
            rows={4}
            value={newComment}
            onChange={handleNewInputChange}
            maxLength={300}
            className={cls("px-4 pb-5 border focus:outline-none resize-none rounded-md",
              currentUser ? "pt-12" : "pt-5"
            )}
          />
          <button
            onClick={handleSubmit}
            disabled={newComment.length === 0}
            className={cls("absolute bottom-3 right-3 px-4 py-1 rounded-md",
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
