"use client";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/community/post";

import { useRouter } from "next/navigation";

import { Database } from "@/types/supabase";
type PostType = Database["public"]["Tables"]["community"]["Row"];

const GetPosts = () => {
  const router = useRouter();
  const { isLoading, data: posts, error } = useQuery<PostType[]>(
    ["communityAllPosts"],
    () => getPosts(),
    {
      staleTime: 60000,
      cacheTime: 120000
    },
  );

  if (isLoading) return "커뮤니티 게시글 로딩중";
  if (error) {
    console.error("데이터를 불러오는 중에 오류가 발생했습니다:", error);
    return "데이터를 불러오는 중에 오류가 발생했습니다.";
  }
  return (
    <>
      <h1 className="text-xl flex justify-center items-center mx-auto mt-10">전체 카테고리 게시글 목록</h1>
      {
        <div className="flex flex-col max-w-7xl my-10 mx-auto items-center justify-center">
        {Array.isArray(posts) && posts.map((post: PostType) => (
            <div
              key={post.post_uid}
              className="flex justify-between w-3/4 border px-4 py-7 mb-2 rounded-md"
            >
              <div className="flex">
                <span className="w-32">{post.category}</span>
              <div
                onClick={()=>router.push(`/community/${post.post_uid}`)}
                className="flex items-center space-x-2 cursor-pointer hover:text-green-400">
                  <h4>{post.title}</h4>
                  <span className="text-sm text-gray-500">
                    ({post.number_comments})
                  </span>
                </div>
              </div>
              <span>{post.updated_date}</span>
            </div>
          ))}
        </div>
      }
    </>
  );
};

export default GetPosts;
