"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { deletePost, updatePost } from "@/api/community/post";
import {
  cancelLikePost,
  createLikePost,
  getLikeStatus,
  getLikesNum,
} from "@/api/community/like";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Database } from "@/types/supabase";
import { useAuth } from "@/hooks/useAuth";
import CategoryTag from "../ui/CategoryTag";
import DropButtons from "../ui/DropButtons";
import copy from "clipboard-copy";
import { useSetRecoilState } from "recoil";
import { editPostAtom } from "@/libs/atoms";
import { DetailPostProps } from "@/types/types";
import Image from "next/image";
import { ToastError, ToastInfo, ToastSuccess } from "@/libs/toastifyAlert";
import ProfileImage from "../ui/ProfileImage";

type LikesType = Database["public"]["Tables"]["like_post"]["Insert"];

const DetailPost = ({ postDetail, postUid }: DetailPostProps) => {
  const router = useRouter();
  const currentUser = useAuth();
  const [isLiked, setIsLiked] = useState<LikesType | null>(null);
  const [isToggled, setIsToggled] = useState(false);

  const { data: likesNumber } = useQuery(
    ["likesNumber"],
    () => getLikesNum(postUid),
  );

  const setEditPostState = useSetRecoilState(editPostAtom);

  useEffect(() => {
    updatePost({ post_uid: postUid, number_likes: likesNumber || 0 });
  }, [likesNumber]);

  const getLikedStatus = async () => {
    if (currentUser) {
      try {
        const likeStatus = await getLikeStatus(postUid, currentUser.uid);
        setIsLiked(likeStatus);
      } catch (error) {
        // console.error("Error fetching like status:", error);
      }
    }
  };

  useEffect(() => {
    getLikedStatus();
  }, [currentUser, postUid]);

  // 수정, 삭제 드랍버튼 토글
  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  // 게시글 삭제 mutate
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityAllPosts"] });
      window.alert("게시글이 정상적으로 삭제되었습니다.");
      location.href = "/community";
    },
    onError: (error) => {
      // console.error("게시글 삭제 에러:", error);
      window.alert(
        "게시글이 정상적으로 삭제되지 않았습니다. 다시 시도해주세요!",
      );
    },
  });

  const handleDeleteClick = () => {
    const ok = window.confirm("게시글을 정말 삭제하시겠습니까?");
    if (!ok) return false;
    if (ok) deleteMutation.mutate(postUid);
  };

  // 수정 버튼 누를 때 수정 페이지로 이동
  const handleEditClick = () => {
    setEditPostState({ postDetail, isEditing: true });
    router.push("/community/edit");
  };

  // 게시글 북마크
  const likeMutation = useMutation(createLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postUid] });
      queryClient.invalidateQueries({ queryKey: ["likesNumber"] });
    },
    onError: (error) => {
      // console.log("북마크 등록 에러:", error);
    },
  });

  const cancelLikeMutation = useMutation(cancelLikePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postUid] });
      queryClient.invalidateQueries({ queryKey: ["likesNumber"] });
    },
    onError: (error) => {
      // console.log("북마크 취소 에러:", error);
    },
  });

  const handleLikeClick = async () => {
    if (!currentUser) {
      ToastInfo("로그인이 필요한 서비스 입니다.");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return false;
    }

    const likeStatus = await getLikeStatus(postUid, currentUser.uid);

    if (likeStatus) {
      // 이미 북마크를 누른 경우 북마크 취소
      const cancelLike = {
        post_uid: postUid,
        like_user: currentUser.uid,
      };
      cancelLikeMutation.mutate(cancelLike);
      setIsLiked(null);
    } else {
      // 북마크를 누르지 않은 경우 북마크 추가
      const newLike = {
        post_uid: postUid,
        like_user: currentUser.uid,
      };
      likeMutation.mutate(newLike);
      setIsLiked(newLike);
    }
  };

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    copy(currentUrl)
      .then(() => ToastSuccess("링크가 복사되었습니다!"))
      .catch((err) =>
        ToastError("링크 복사에 실패했습니다. 다시 시도해주세요!"),
      );
  };

  return (
    <div className="flex flex-col w-full">
      <button onClick={() => router.back()} className="mb-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="flex flex-col pb-5">
        <CategoryTag>{postDetail?.category as string}</CategoryTag>
        <div className="mt-4 first-letter:flex items-end justify-between space-x-5 pb-5 border-b">
          <h1 className="text-3xl text-gray-700 font-semibold">
            {postDetail?.title}
          </h1>
        </div>
        <div className="flex mt-3 py-3">
          <div className="flex w-full justify-between">
            <div className="flex items-center justify-center space-x-3">
              <ProfileImage userUid={postDetail?.author_uid} />
              <div className="flex flex-col items-start justify-center">
                <span className="text-gray-600">{postDetail?.author_name}</span>
                <span className="text-sm text-gray-400">
                  {postDetail?.updated_date}
                </span>
              </div>
            </div>
            {currentUser?.uid === postDetail?.author_uid ? (
              <div onClick={handleToggle}>
                <DropButtons
                  toggleState={isToggled}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              </div>
            ) : null}
          </div>
        </div>
        {postDetail && (
          <div
            dangerouslySetInnerHTML={{ __html: postDetail.content }}
            className="mt-14 px-2"
          />
        )}
        <div className="flex justify-center items-center mt-20 mb-3 mx-auto space-x-5">
          <div className="flex justify-center items-center space-x-1">
            <button onClick={handleLikeClick}>
              {isLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              )}
            </button>
            <span>{likesNumber}</span>
          </div>
          <button id="shareLinkButton" onClick={handleCopyUrl}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
