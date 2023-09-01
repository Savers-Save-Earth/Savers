"use client";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/api/community/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { createReply, deleteReply, getReplies, updateReply } from "@/api/community/reply";
import { updatePost } from "@/api/community/post";

import CommentTag from "./CommentTag";
import { CommentType, DetailPostProps, EditCommentType, EditReplyType, NewCommentType, NewReplyType, ReplyType } from "@/types/types";
import Image from "next/image";

import { cls, convertTimestamp } from "@/libs/util";
import { ToastError, ToastSuccess, ToastWarn } from "@/libs/toastifyAlert";

const PostComments = ({ postDetail, postUid }: DetailPostProps) => {
  const router = useRouter();
  const currentUser = useAuth();

  const [newComment, setNewComment] = useState("");

  const [editingComment, setEditingComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [replyCommentUid, setReplyCommentUid] = useState<string | null>(null);
  const [newReply, setNewReply] = useState("");
  const [editingReply, setEditingReply] = useState("");
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);

  const { data: comments } = useQuery<CommentType[]>(
    ["comments", postUid],
    () => getComments(postUid),
  );
  const { data: replies } = useQuery<ReplyType[]>(["replies", postUid], () =>
    getReplies(postUid),
  );

  const totalCommentsNumber = (comments?.length || 0) + (replies?.length || 0)

  // 댓글 개수 변동 있을 때 Post-number_comments에 숫자 업데이트
  useEffect(() => {
    updatePost({ post_uid: postUid, number_comments: totalCommentsNumber });
  }, [totalCommentsNumber]);


  // 댓글 등록 mutation
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation(createComment, {
    onSuccess: () => {
      ToastSuccess("댓글이 정상적으로 등록되었습니다.")
      queryClient.invalidateQueries({ queryKey: ["comments", postUid] });
      setNewComment("");
    },
    onError: (error) => {
      console.error("댓글 등록 에러:", error);
      ToastError("댓글이 정상적으로 등록되지 않았습니다. 다시 시도해주세요!");
    },
  });

  // 댓글 등록 submit handler
  const handleCommentSubmit = () => {
    if (!currentUser) {
      ToastWarn("댓글을 등록하려면 로그인 해주세요!");
      router.push("/login");
    }

    const writtenTime = new Date();
    const commentData: NewCommentType = {
      content: newComment,
      post_uid: postUid,
      writer_uid: currentUser?.uid,
      writer_name: currentUser?.nickname as string,
      created_date: convertTimestamp(writtenTime),
      updated_date: convertTimestamp(writtenTime),
      isDeleted: false,
    };
    createCommentMutation.mutate(commentData);
    setNewComment("");
  };

  // 댓글 삭제 mutation
  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postUid] });
      ToastSuccess("댓글이 정상적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("댓글 삭제 에러:", error);
      Error(
        "댓글이 정상적으로 삭제되지 않았습니다. 다시 시도해주세요!",
      );
    },
  });

  // 댓글 삭제 submit handler
  const handleDeleteComment = (commentUid: string) => {
    const ok = window.confirm("댓글을 정말 삭제하시겠어요?");
    if (!ok) return false;
    deleteCommentMutation.mutate(commentUid);
  };

  // 댓글 수정 mutation
  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postUid] });
      console.log("댓글 수정 onSuccess data >> ", data);
    },
    onError: (error) => {
      console.error("댓글 수정 에러:", error);
      ToastError("댓글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!");
    },
  });

  // 댓글 수정 상태 handler
  const handleEditCommentState = (commentUid: string) => {
    const commentToEdit = comments?.find(
      (comment) => comment.comment_uid === commentUid,
    );
    if (commentToEdit) {
      setEditingComment(commentToEdit.content);
      setEditingCommentId(commentUid);
    }
  };

  // 댓글 수정 취소 시 수정 모드 종료
  const handleCancleEditComment = () => {
    setEditingComment("");
    setEditingCommentId(null);
  };

  // 댓글 수정 submit handler
  const handleSaveEditComment = (commentUid: string) => {
    const writtenTime = new Date();
    const editCommentData: EditCommentType = {
      comment_uid: commentUid,
      content: editingComment,
      writer_name: currentUser?.nickname,
      updated_date: convertTimestamp(writtenTime),
    };
    updateCommentMutation.mutate(editCommentData);
    setEditingComment("");
    setEditingCommentId(null);
  };

  // 대댓글 등록 mutation
  const createReplyMutation = useMutation(createReply, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies"] });
      setNewComment("");
    },
    onError: (error) => {
      console.error("대댓글 등록 에러:", error);
      ToastError(
        "대댓글이 정상적으로 등록되지 않았습니다. 다시 시도해주세요!",
      );
    },
  });

  // 대댓글 수정 mutation
  const updateReplyMutation = useMutation(updateReply, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["replies", postUid] });
    },
    onError: (error) => {
      console.error("대댓글 수정 에러:", error);
      ToastError(
        "대댓글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!",
      );
    },
  });

  // 대댓글 삭제 mutation
  const deleteReplyMutation = useMutation(deleteReply, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["replies", postUid] });
    },
    onError: (error) => {
      console.error("대댓글 수정 에러:", error);
      Error(
        "대댓글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!",
      );
    },
  });

  // 대댓글 등록 submit handler
  const handleReplySubmit = (commentUid: string) => {
    if (!currentUser) {
      ToastError("대댓글을 등록하려면 로그인 해주세요!");
      router.push("/login");
    }

    if (newReply === "") {
      ToastWarn("대댓글을 입력해주세요!");
      return false;
    }

    const writtenTime = new Date();
    const newReplyData: NewReplyType = {
      content: newReply,
      post_uid: postUid,
      comment_uid: commentUid,
      writer_uid: currentUser?.uid,
      writer_name: currentUser?.nickname as string,
      created_date: convertTimestamp(writtenTime),
      update_date: convertTimestamp(writtenTime),
    };
    createReplyMutation.mutate(newReplyData);
    setReplyCommentUid(null);
    setNewReply("");
  };

  // 대댓글 수정 상태 handler
  const handleEditReply = (replyUid: string) => {
    const replyToEdit = replies?.find((reply) => reply.reply_uid === replyUid);
    if (replyToEdit) {
      setEditingReply(replyToEdit.content);
      setEditingReplyId(replyUid);
    }
  };

  // 대댓글 수정 취소 시 수정 모드 종료
  const handleCancelEditReply = () => {
    setEditingReply("");
    setEditingReplyId(null);
  };

  // 대댓글 수정 저장 submit handler
  const handleSaveEditReply = (replyUid: string) => {
    const writtenTime = new Date();
    const editReplyData: EditReplyType = {
      reply_uid: replyUid,
      content: editingReply,
      writer_name: currentUser?.nickname,
      update_date: convertTimestamp(writtenTime),
    };
    updateReplyMutation.mutate(editReplyData);
    setEditingReply("");
    setEditingReplyId(null);
  };

  // 대댓글 삭제 submit handler
  const handleDeleteReply = (replyUid: string) => {
    const ok = window.confirm("댓글을 정말 삭제하시겠어요?");
    if (!ok) return false;
    deleteReplyMutation.mutate(replyUid);
  };

  return (
    <>
      <div
        id="comments-container"
        className="flex flex-col w-full border-t mb-20"
      >
        <div className="flex py-5 border-b">
          <p>댓글</p>
            <span className="text-gray-400 ml-1">
              {totalCommentsNumber}
            </span>
        </div>
        <div className="flex flex-col w-full">
          {comments?.map((comment) => (
            <div
              className="flex flex-col w-full border-b"
              key={comment.comment_uid}
            >
              <div className="flex items-start space-x-4 p-4 w-full">
              <div className="w-12 h-12 relative object-contain">
                <Image
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg"
                  alt="profile"
                  fill={true}
                />
              </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="flex space-x-1 items-center">
                        <span className="mr-1">{comment.writer_name}</span>
                        {postDetail?.author_uid === comment.writer_uid ? (
                          <CommentTag>작성자</CommentTag>
                        ) : null}
                        {currentUser?.uid === comment.writer_uid ? (
                          <CommentTag>내댓글</CommentTag>
                        ) : null}
                      </div>
                      {
                        editingCommentId === comment.comment_uid
                          ?
                          null
                          :
                          (currentUser?.uid === comment.writer_uid
                            && comment.isDeleted === false
                            ? (
                          <div className="space-x-2 text-sm text-gray-700">
                            <button
                              onClick={() => handleEditCommentState(comment.comment_uid)}
                            >
                              수정
                            </button>
                            <button onClick={() => handleDeleteComment(comment.comment_uid)}>삭제</button>
                          </div>
                        ) : null)
                      }
                    </div>
                    <span className="mt-1 text-sm text-gray-400">
                      {comment.updated_date}
                    </span>
                  </div>
                  {editingCommentId === comment.comment_uid ? (
                    <div className="flex relative">
                      <textarea
                        value={editingComment}
                        onChange={(e) =>
                          setEditingComment(e.currentTarget.value)
                        }
                        rows={2}
                        maxLength={200}
                        className="w-full no-scrollbar mt-2 px-4 pt-3 pb-16 border focus:outline-none resize-none rounded-2xl"
                      />
                      <div className="text-sm absolute space-x-2 bottom-4 right-6">
                        <button
                          onClick={handleCancleEditComment}
                          className="text-gray-400"
                        >
                          취소
                        </button>
                        <button
                          onClick={() => handleSaveEditComment(comment.comment_uid)}
                          className="text-mainGreen">수정</button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 pr-6 text-gray-700 mt-2">
                      {comment.isDeleted === false ? <p>{comment.content}</p> : <p className="text-gray-300">삭제된 댓글입니다.</p>}
                      {currentUser && comment.isDeleted === false ? (
                        <button
                          onClick={() => {
                            if (replyCommentUid === comment.comment_uid) {
                              setReplyCommentUid(null);
                            } else {
                              setReplyCommentUid(comment.comment_uid);
                            }
                          }}
                          className="flex items-center space-x-1 text-sm text-gray-500 mt-4"
                        >
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
                              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                            />
                          </svg>
                          <span>답글</span>
                        </button>
                      ) : null}
                    </div>
                  )}
                  <div>
                    {replyCommentUid === comment.comment_uid && (
                      <div className="flex flex-col relative">
                        <textarea
                          placeholder={`${comment.writer_name}님께 답글 달기`}
                          value={newReply}
                          onChange={(e) => setNewReply(e.currentTarget.value)}
                          rows={2}
                          maxLength={200}
                          className="no-scrollbar mt-2 px-4 pt-3 pb-16 border focus:outline-none resize-none rounded-2xl"
                        />
                        <button
                          onClick={() => handleReplySubmit(replyCommentUid)}
                          className="flex absolute bottom-4 right-8 text-mainGreen"
                        >
                          등록
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {replies
                ?.filter(
                  (replyData) => replyData.comment_uid === comment.comment_uid,
                )
                .map((reply) => (
                  <div
                    className="flex flex-col border-y w-full bg-gray-100 p-4"
                    key={reply.reply_uid}
                  >
                    <div className="flex items-start space-x-4 pl-14">
                    <div className="w-12 h-12 relative object-contain">
                      <Image
                        src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg"
                        alt="profile"
                        fill={true}
                      />
                    </div>
                      <div className="flex flex-col w-full">
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <div className="flex space-x-1 items-center">
                              <span className="mr-1">{reply.writer_name}</span>
                              {postDetail?.author_uid === reply.writer_uid ? (
                                <CommentTag>작성자</CommentTag>
                              ) : null}
                              {currentUser?.uid === reply.writer_uid ? (
                                <CommentTag>내댓글</CommentTag>
                              ) : null}
                            </div>
                            {
                              editingReplyId === reply.reply_uid
                                ?
                                null
                                :
                                (currentUser?.uid === reply.writer_uid ? (
                                  <div className="space-x-2 text-sm text-gray-700">
                                    <button onClick={() => handleEditReply(reply.reply_uid)}>수정</button>
                                    <button onClick={() => handleDeleteReply(reply.reply_uid)}>삭제</button>
                                  </div>
                                ) : null)
                            }
                          </div>
                          <span className="mt-1 text-sm text-gray-400">
                            {reply.update_date}
                          </span>
                        </div>
                        {
                          editingReplyId === reply.reply_uid
                            ?
                            <div className="flex relative">
                              <textarea
                                value={editingReply}
                                onChange={(e) => setEditingReply(e.currentTarget.value)}
                                rows={2}
                                maxLength={200}
                                className="w-full no-scrollbar mt-2 px-4 pt-3 pb-16 border focus:outline-none resize-none rounded-2xl"
                                />
                            <div className="text-sm absolute space-x-2 bottom-4 right-6">
                              <button
                                onClick={handleCancelEditReply}
                                className="text-gray-400"
                              >
                                취소
                              </button>
                              <button
                                onClick={() => handleSaveEditReply(reply.reply_uid)}
                                className="text-mainGreen">수정</button>
                            </div>
                    </div>
                          :
                          <div className="py-2 pr-6 text-gray-700 mt-2">
                            <p>{reply.content}</p>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        {/* ------- 새 댓글 등록 textarea -------  */}
        <div className="relative flex flex-col mt-5">
          <textarea
            id="commentInput"
            placeholder={
              currentUser
                ? "댓글을 입력하세요."
                : "댓글을 등록하려면 로그인 해주세요."
            }
            disabled={!currentUser}
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.currentTarget.value)}
            maxLength={200}
            className="w-full no-scrollbar mt-2 px-4 pt-3 pb-16 border focus:outline-none resize-none rounded-2xl"
          />
          <button
            onClick={handleCommentSubmit}
            disabled={newComment.length === 0 || !currentUser}
            className={cls(
              "absolute bottom-2 right-1 px-4 py-1 rounded-md",
              newComment.length === 0 || !currentUser
                ? "text-gray-200"
                : "text-mainGreen",
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