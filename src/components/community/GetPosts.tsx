"use client";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/community/post";
import { getCommentsNum } from "@/api/community/post";

import { usePathname } from "next/navigation";

import { Database } from "@/types/supabase";
import { removeHtmlTags } from "@/libs/util";

type PostType = Database["public"]["Tables"]["community"]["Row"];
type QueryKeyMap = {
  [key: string]: string[];
};

const GetPosts = () => {
  const pathname = usePathname();
  const getPathnameQueryKey = (pathname: string) => {
  const queryKeyMap: QueryKeyMap = {
    "/community": ["allPosts"],
    "/community/product": ["productPosts"],
    "/community/restaurant": ["restaurantPosts"],
    "/community/recipe": ["recipePosts"],
    "/community/ohjiwan": ["ohjiwanPosts"],
  };

  return queryKeyMap[pathname] || ["allPosts"];
  };
  const queryKey = getPathnameQueryKey(pathname);

  const { isLoading, data: posts, error } = useQuery<PostType[]>(
    queryKey,
    () => getPosts(pathname), {
    staleTime: 60000,
    cacheTime: 300000,
  });

  if (isLoading) return "커뮤니티 게시글 로딩중";
  if (error) {
    console.error("데이터를 불러오는 중에 오류가 발생했습니다:", error);
    return "데이터를 불러오는 중에 오류가 발생했습니다.";
  }
  return (
    <>
      <h1 className="text-xl flex justify-center items-center mx-auto mt-10">
        전체 카테고리 게시글 목록
      </h1>
      {
        <div className="flex flex-col max-w-7xl my-10 mx-auto items-center justify-center">
          {Array.isArray(posts) &&
            posts.map((post: PostType) => (
              <div
                key={post.post_uid}
                className="flex flex-col justify-between w-3/4 border px-4 py-4 mb-2 rounded-md space-y-2"
              >
                <div className="flex flex-col space-y-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-400">
                      {post.category}
                    </span>
                  </div>
                  <div>
                    <div>
                      <Link href={`/community/${post.post_uid}`}>
                        <h4 className="font-medium text-lg flex items-center space-x-2 cursor-pointer hover:underline leading-10">
                          {post.title}
                        </h4>
                      </Link>
                      <Link href={`/community/${post.post_uid}`}>
                        <p className="text-gray-500 text-sm cursor-pointer hover:underline text-ellipsis line-clamp-2">
                          {removeHtmlTags(post.content)}
                        </p>
                      </Link>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-5">
                      <div className="space-x-2">
                        <span>댓글 {getCommentsNum(post.post_uid)}</span>
                        <span>좋아요 0</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {post.updated_date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      }
    </>
  );
};

export default GetPosts;
