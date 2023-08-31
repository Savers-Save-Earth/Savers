"use client";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "@/api/community/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Database } from "@/types/supabase";
import { cls, convertTimestamp } from "@/libs/util";
import { useAuth } from "@/hooks/useAuth";
import { createReply, deleteReply, getReplies, updateReply } from "@/api/community/reply";
import { updatePost } from "@/api/community/post";
import ButtonContainer from "./ButtonContainer";

type CommentType = Database["public"]["Tables"]["community_comment"]["Row"];
type NewCommentType =
  Database["public"]["Tables"]["community_comment"]["Insert"];
type EditCommentType =
  Database["public"]["Tables"]["community_comment"]["Update"];

type ReplyType = Database["public"]["Tables"]["community_reply"]["Row"];
type NewReplyType = Database["public"]["Tables"]["community_reply"]["Insert"];
type EditReplyType = Database["public"]["Tables"]["community_reply"]["Update"];

const PostComments = () => {
  const router = useRouter();
  const currentUser = useAuth();
  const { postUid } = useParams() as { postUid: string };
  const { data: comments } = useQuery<CommentType[]>(
    ["comments", postUid],
    () => getComments(postUid),
  );
  const { data: replies } = useQuery<ReplyType[]>(["replies", postUid], () =>
    getReplies(postUid),
  );

  const [newComment, setNewComment] = useState("");

  const [isToggled, setIsToggled] = useState(false);
  const [editingComment, setEditingComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const [replyCommentUid, setReplyCommentUid] = useState<string | null>(null);
  const [newReply, setNewReply] = useState("");
  const [editingReply, setEditingReply] = useState("");
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);

  useEffect(() => {
    updatePost({post_uid: postUid, number_comments: (comments?.length ?? 0) + (replies?.length ?? 0)})
  }, [comments?.length, replies?.length])

  // 수정, 삭제 드랍버튼 토글
  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  }

  // 댓글 등록 mutation
  const queryClient = useQueryClient();
  const createMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postUid] });
      setNewComment("");
    },
    onError: (error) => {
      console.error("댓글 등록 에러:", error);
      window.alert("댓글이 정상적으로 등록되지 않았습니다. 다시 시도해주세요!");
    },
  });

  // 댓글 등록 submit handler
  const handleCommentSubmit = () => {
    if (!currentUser) {
      window.alert("댓글을 등록하려면 로그인 해주세요!");
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
    createMutation.mutate(commentData);
    setNewComment("");
  };

  // 댓글 삭제 mutation
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postUid] });
      window.alert("댓글이 정상적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("댓글 삭제 에러:", error);
      window.alert(
        "댓글글이 정상적으로 삭제되지 않았습니다. 다시 시도해주세요!",
      );
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
      console.log("댓글 수정 onSuccess data >> ", data);
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
    const commentToEdit = comments?.find(
      (comment) => comment.comment_uid === commentUid,
    );
    if (commentToEdit) {
      setEditingComment(commentToEdit.content);
      setEditingCommentId(commentUid);
    }
  };

  // 댓글 수정 취소 시 수정 모드 종료
  const handleCancelEdit = () => {
    setEditingReply("");
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
    };
    updateMutation.mutate(editCommentData);
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
      window.alert(
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
      window.alert(
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
      window.alert(
        "대댓글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!",
      );
    },
  })

  const handleReplySubmit = (commentUid: string) => {
    if (!currentUser) {
      window.alert("대댓글을 등록하려면 로그인 해주세요!");
      router.push("/login");
    }

    if (newReply === "") {
      window.alert("대댓글을 입력해주세요!");
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
  const handleEditReplyState = (replyUid: string) => {
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

  // 대댓글 수정 저장
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

  // 대댓글 삭제
  const handleDeleteReply = (replyUid: string) => {
    const ok = window.confirm("댓글을 정말 삭제하시겠습니까?");
    if (!ok) return false;
    deleteReplyMutation.mutate(replyUid);
  };

  return (
    <>
      <div className="w-full mb-10 flex flex-col mx-auto">
        <div className="border-b py-4 flex items-center space-x-2">
          <span className="ml-2">댓글</span>
          <span className="text-gray-500">{(comments?.length ?? 0) + (replies?.length ?? 0)}</span>
        </div>
        {comments?.map((comment: CommentType) => (
          <div
            key={comment.comment_uid}
            className="flex flex-col px-2 py-4 border-b"
          >
            <div className="flex justify-between mb-2">
              <div className="flex flex-col">
                <span>{comment.writer_name}</span>
                <span className="text-sm text-gray-400">
                  {comment.updated_date}
                </span>
              </div>
              <div className="flex space-x-3 mr-2">
                {currentUser?.uid === comment.writer_uid && (
                  <div className="space-x-2">
                    {editingCommentId === comment.comment_uid ? (
                      <div className="space-x-2 text-sm text-gray-700">
                        <button
                          onClick={() => handleSaveEdit(comment.comment_uid)}
                        >
                          저장
                        </button>
                        <button onClick={handleCancelEdit}>취소</button>
                      </div>
                    ) : (
                      <div className="space-x-2 text-sm text-gray-700">
                        <button onClick={() => handleEditState(comment.comment_uid)}>수정</button>
                        <button onClick={() => handleDelete(comment.comment_uid)}>삭제</button>
                      </div>
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
                maxLength={300}
                className="rounded-xl px-4 py-2 pb-5 border focus:outline-none resize-none"
              />
            ) : (
              <>
                <p>{comment.content}</p>
                {currentUser ? (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        if (replyCommentUid === comment.comment_uid) {
                          setReplyCommentUid(null);
                        } else {
                          setReplyCommentUid(comment.comment_uid);
                        }
                      }}
                      className="text-gray-400 text-sm"
                    >
                      답글
                    </button>
                  </div>
                ) : null}
                {replyCommentUid === comment.comment_uid && (
                  <div className="flex flex-col">
                    <textarea
                      placeholder={`${comment.writer_name}님께 답글 달기`}
                      value={newReply}
                      onChange={(e) => setNewReply(e.currentTarget.value)}
                      rows={4}
                      maxLength={300}
                      className="mt-2 px-4 py-3 pb-5 border focus:outline-none resize-none rounded-md"
                    />
                    <button
                      onClick={() => handleReplySubmit(replyCommentUid)}
                      className="flex"
                    >
                      등록
                    </button>
                  </div>
                )}

                {/* ------- 현재 댓글에 대한 대댓글 mapping ------- */}
                {replies?.map((reply: ReplyType) => {
                  if (reply.comment_uid === comment.comment_uid) {
                    return (
                      <div
                        key={reply.reply_uid}
                        className="w-full flex flex-col border-t rounded-sm my-4"
                      >
                        <div className="flex flex-col ml-2">
                          <div className="flex my-2 justify-between">
                          <div className="flex flex-col mb-2">
                            <span>{reply.writer_name}</span>
                            <span className="text-sm text-gray-400">
                              {reply.update_date}
                            </span>
                          </div>
                            {currentUser?.uid === reply.writer_uid ? (
                              <div className="space-x-2 text-sm text-gray-700">
                                {editingReplyId === reply.reply_uid ? (
                                  <div className="space-x-2 text-sm text-gray-700">
                                    <button onClick={() => handleSaveEditReply(reply.reply_uid)}>
                                      저장
                                    </button>
                                    <button onClick={handleCancelEditReply}>
                                      취소
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <button onClick={() => handleEditReplyState(reply.reply_uid)}>
                                      수정
                                    </button>
                                    <button onClick={() => handleDeleteReply(reply.reply_uid)}>
                                      삭제
                                    </button>
                                  </>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {/* -------- 대댓글 수정 -------- */}
                        {editingReplyId === reply.reply_uid ? (
                          <textarea
                            value={editingReply}
                            onChange={(e) =>
                              setEditingReply(e.currentTarget.value)
                            }
                            rows={4}
                            maxLength={300}
                            className="rounded-md px-4 py-2 pb-5 border focus:outline-none resize-none"
                          />
                        ) : (
                          <p>{reply.content}</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </>
            )}
          </div>
        ))}

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
            rows={1}
            value={newComment}
            onChange={(e) => setNewComment(e.currentTarget.value)}
            maxLength={300}
            className="px-3 py-3 border focus:outline-none resize-none rounded-md bg-gray-100"
          />
          <button
            onClick={handleCommentSubmit}
            disabled={newComment.length === 0 || !currentUser}
            className={cls(
              "absolute bottom-2 right-1 px-4 py-1 rounded-md",
              newComment.length === 0 || !currentUser ? "text-gray-200" : "text-mainGreen",
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