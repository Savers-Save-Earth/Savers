"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import EditPost from "./EditPost";
import { deletePost, getPostDetail } from "@/api/community/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Database } from "@/types/supabase";
import { useAuth } from "@/hooks/useAuth";
import { LikesType, cancleLikePost, createLikePost, getLikeStatus, getLikesNum } from "@/api/community/like";

type PostType = Database["public"]["Tables"]["community"]["Row"];

const DetailPost = () => {
  const currentUser = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const { postUid } = useParams() as { postUid: string; };
  const { data: postDetail } = useQuery<PostType>(
    ["postDetail", postUid],
    () => getPostDetail(postUid),
    { cacheTime: 6000 }
  );

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityAllPosts"] });
      window.alert("게시글이 정상적으로 삭제되었습니다.");
      location.href = "/community";
    },
    onError: (error) => {
      console.error("게시글 삭제 에러:", error);
      window.alert("게시글이 정상적으로 삭제되지 않았습니다. 다시 시도해주세요!");
    },
  });

  const handleDelete = () => {
    const ok = window.confirm("게시글을 정말 삭제하시겠습니까?");
    if (!ok) return false;
    if (ok) deleteMutation.mutate(postUid);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // const { data: likesData } = useQuery<LikesType[]>(
  //   ["likes", postUid],
  //   () => getLikeStatus(postUid, currentUser?.uid),
  // )

  // const addLikeMutation = useMutation(createLikePost, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["likes", postUid] });
  //   },
  //   onError: (error) => {
  //     console.log("좋아요 등록 에러:", error);
  //   }
  // })

  // const cancelLikeMutation = useMutation(cancleLikePost, {
  //   // 취소 성공 시 좋아요 캐시를 무효화
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["likes", postUid] });
  //   },
  //   // ...
  // });

  // const handleLikeClick = async () => {
  //   if (!currentUser) {
  //     window.alert("좋아요를 누르시려면 로그인 해주세요!");
  //     router.push("/login");
  //     return false;
  //   }
    
  //   // 현재 사용자의 좋아요 상태를 가져오기
  //   const userLikeStatus = await getLikeStatus(postUid, currentUser.uid);
  //   console.log("userLikeStatus => ", userLikeStatus);

  //   // 이미 좋아요를 눌렀다면 취소
  //   if (userLikeStatus.length > 0) {
  //     cancelLikeMutation.mutate(postUid, currentUser.uid);
  //   } else {
  //     // 좋아요 추가
  //     const newLike = {
  //       like_user: currentUser.uid,
  //       post_uid: postUid
  //     }
  //     addLikeMutation.mutate(newLike);
  //   }
  // }

  return (
    <div className="flex flex-col max-w-7xl mt-10 px-10 mx-auto">
      <button
        onClick={() => router.back()}
        className="w-28 mb-10 bg-green-200 px-5 py-2 rounded-md shadow-sm hover:bg-green-300 hover:-translate-y-1 transition ease-in-out duration-200"
      >
        뒤로가기
      </button>
      {isEditing ? (
        // 수정 모드
        <EditPost postDetail={postDetail} postUid={postUid} />
      ) : (
        // 상세 정보 모드
        <div className="flex flex-col border-b pb-5">
          <h2 className="text-lg mb-3 text-gray-400 font-semibold">
            {postDetail?.category}
          </h2>
          <div className="flex items-end justify-between space-x-5 pb-5 border-b">
            <h1 className="text-3xl text-gray-700 font-semibold">
              {postDetail?.title}
            </h1>
            {currentUser?.uid === postDetail?.author_uid ? (
              <div className="flex space-x-3">
                <button
                  onClick={handleEditClick}
                  className="w-20 text-sm border-b-4 border-blue-300 px-5 pb-1 shadow-sm hover:-translate-y-1 transition ease-in-out duration-200"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="w-20 text-sm border-b-4 border-blue-300 px-5 pb-1 shadow-sm hover:-translate-y-1 transition ease-in-out duration-200"
                >
                  삭제
                </button>
              </div>
            ) : null}
          </div>
          <div className="flex justify-between mt-3 py-3">
            <div className="flex space-x-5 items-center justify-center">
              <span>{postDetail?.author_name}</span>
              <span className="text-sm">{postDetail?.updated_date}</span>
            </div>
            <div className="flex space-x-3">
              <span>조회수 0</span>
              <span>좋아요 {0}</span>
            </div>
          </div>
          {postDetail && (
            <div
              dangerouslySetInnerHTML={{ __html: postDetail.content }}
              className="mt-10"
            />
          )}
          <div className="mt-5 mx-auto space-x-5">
            <button>
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
            </button>
            <button>
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
      )}
    </div>
  );
};

export default DetailPost;
