"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import EditPost from "./EditPost";
import { deletePost, getPostDetail } from "@/api/community/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Database } from "@/types/supabase";
import { useAuth } from "@/hooks/useAuth";

type PostType = Database["public"]["Tables"]["community"]["Row"];

const DetailPost = () => {
  const currentUser = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  console.log("isEditing >>> ", isEditing);

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

  return (
    <div className="flex flex-col max-w-7xl mt-10 px-10 py-10 mx-auto">
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
        <div className="flex flex-col border-b pb-10">
          <h2 className="text-lg mb-3 text-gray-400 font-semibold">
            {postDetail?.category}
          </h2>
          <div className="flex items-end justify-between space-x-5 pb-5 border-b">
            <h1 className="text-3xl text-gray-700 font-semibold">
              {postDetail?.title}
            </h1>
              {currentUser?.uid === postDetail?.author_uid ?
                (
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
                ) : (
                  null
                )
            }
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex space-x-5 items-center">
              <span>{postDetail?.author_name}</span>
              <span className="text-sm">{postDetail?.updated_date}</span>
            </div>
            <div className="flex space-x-3">
              <span>조회수 0</span>
              <span>좋아요 0</span>
            </div>
          </div>
          {postDetail && (
            <div
              dangerouslySetInnerHTML={{ __html: postDetail.content }}
              className="mt-10"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DetailPost;
