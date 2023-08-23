"use client";
import { getPostDetail } from "@/api/community/post";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { Database } from "@/types/supabase";
type PostType = Database["public"]["Tables"]["community"]["Row"];

const CommunityPostDetail = () => {
  const { postUid } = useParams();

  const { data: postDetail } = useQuery<PostType>(
    ["communityAllPosts"],
    () => getPostDetail(postUid),
  );

  const router = useRouter();
  return (
    <div className="flex flex-col mt-10">
      <button
        onClick={() => router.back()}
        className="items-center mx-auto bg-green-200 px-5 py-2 rounded-md shadow-sm hover:bg-green-300 hover:-translate-y-1 transition ease-in-out duration-200"
      >
        뒤로가기
      </button>
      <div className="flex flex-col mt-10 mx-28">
        <div className="flex items-center space-x-5 pb-5 border-b">
          <h1 className="text-3xl text-gray-700 font-semibold">
            {postDetail?.title}
          </h1>
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

export default CommunityPostDetail;