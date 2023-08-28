"use client";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/community/post";
import { getCommentsNum } from "@/api/community/post";

import { usePathname } from "next/navigation";

import { Database } from "@/types/supabase";
import { removeHtmlTags } from "@/libs/util";
import Loading from "@/app/loading";

type PostType = Database["public"]["Tables"]["community"]["Row"];
type QueryKeyMap = {
  [key: string]: string[];
};

const GetPosts = () => {
  const pathname = usePathname();

  // 현재 pathname에 따라 쿼리키 설정하는 함수
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
  // queryKey 변수에 쿼리키 설정함수의 return값 할당
  const queryKey = getPathnameQueryKey(pathname);

  const {
    isLoading,
    data: posts,
    error,
  } = useQuery<PostType[]>(queryKey, () => getPosts(pathname), {
    staleTime: 60000,
    cacheTime: 300000,
  });

  if (isLoading) return <Loading />;
  if (error) {
    console.error("데이터를 불러오는 중에 오류가 발생했습니다:", error);
    return "데이터를 불러오는 중에 오류가 발생했습니다.";
  }
  return (
    <>
      {
        <div className="flex flex-col max-w-7xl my-10 mx-auto items-center justify-center">
          <h1 className="text-xl flex mx-auto my-10">전체 글</h1>
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
                    <div className="flex justify-between mt-5">
                      <div className="flex space-x-3">
                        <div className="space-x-1 items-center justify-center flex text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                            />
                          </svg>
                          <span>{getCommentsNum(post.post_uid)}</span>
                        </div>
                        <div className="space-x-1 items-center justify-center flex text-sm text-gray-500">
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
                          <span>0</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {post.updated_date.split(" ")[0]}
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
