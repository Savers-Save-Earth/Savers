"use client";
import { getProductPosts } from "@/api/community/post";
import { Database } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type PostType = Database["public"]["Tables"]["community"]["Row"];

const CommunityProduct = () => {
  const { isLoading, data: productPosts, error } = useQuery<PostType[]>(
    ["productPosts"],
    () => getProductPosts(),
  );  

if (isLoading) return "제품 카테고리 게시글 로딩중";
if (error) {
  console.error("데이터를 불러오는 중에 오류가 발생했습니다:", error);
  return "데이터를 불러오는 중에 오류가 발생했습니다.";
}
  return (
    <>
      <h1 className="text-xl flex justify-center items-center mx-auto mt-10">제품 카테고리 게시글 목록</h1>
      <div className="flex flex-col my-10 mx-auto items-center justify-center">
        {productPosts?.map((post: PostType) => (
            <div
              key={post.post_uid}
              className="flex justify-between w-3/4 border px-4 py-7 mb-2 rounded-md"
            >
              <div className="flex">
                <span className="w-32">{post.category}</span>
                <h4 className="cursor-pointer hover:text-green-400">
                  <Link href={`/community/${post.post_uid}`}>
                    {post.title}
                  </Link>
                </h4>
              </div>
              <span>{post.created_date}</span>
            </div>
          ))}
        </div>
    </>
  );
};

export default CommunityProduct;
