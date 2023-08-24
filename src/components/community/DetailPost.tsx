"use client";
import { deletePost, getPostDetail } from "@/api/community/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { Database } from "@/types/supabase";
type PostType = Database["public"]["Tables"]["community"]["Row"];

const DetailPost = () => {
  const { postUid } = useParams();
  const { data: postDetail } = useQuery<PostType>(
    ["postDetail"],
    () => getPostDetail(postUid),
  );
  const router = useRouter();

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityAllPosts"] });
      window.alert("게시글이 정상적으로 삭제되었습니다.");
      location.href = "/community";
    },
    onError: (error) => {
      console.error("게시글 등록 에러:", error);
      window.alert("게시글이 정상적으로 삭제되지 않았습니다. 다시 시도해주세요!");
    },
  });

  const handleDelete = () => {
    const ok = window.confirm("게시글을 정말 삭제하시겠습니까?")
    if (!ok) return false;
    if (ok) deleteMutation.mutate(postUid);
  }

  return (
    <div className="flex flex-col max-w-7xl mt-10 px-10 mx-auto">
      <button
        onClick={() => router.back()}
        className="w-28 mb-10 bg-green-200 px-5 py-2 rounded-md shadow-sm hover:bg-green-300 hover:-translate-y-1 transition ease-in-out duration-200"
      >
        뒤로가기
      </button>
      <div className="flex space-x-3 mb-10">
        <button className="w-20 text-sm border-b-4 border-blue-300 px-5 pb-1 shadow-sm hover:-translate-y-1 transition ease-in-out duration-200">
          수정
        </button>
        <button
          onClick={handleDelete}
          className="w-20 text-sm border-b-4 border-blue-300 px-5 pb-1 shadow-sm hover:-translate-y-1 transition ease-in-out duration-200">
          삭제
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex items-end justify-between space-x-5 pb-5 border-b">
          <h1 className="text-3xl text-gray-700 font-semibold">
            {postDetail?.title}
          </h1>
          <span className="text-sm">{postDetail?.updated_date}</span>
        </div>
        {
          postDetail &&
          <div
            dangerouslySetInnerHTML={{ __html: postDetail.content }}
            className="mt-10"
          />
        }
      </div>
    </div>
  );
};

export default DetailPost;
