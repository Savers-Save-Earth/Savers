"use client";
import Link from "next/link";

import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/community/post";
import { useInView } from "react-intersection-observer";

import { usePathname } from "next/navigation";

import Image from "next/image";
import { getFirstImage, getImgUrl, removeHtmlTags } from "@/libs/util";
import Loading from "@/app/loading";
import CategoryTag from "./CategoryTag";

import { PostType, ToTalDataType } from "@/types/types";

type QueryKeyMap = {
  [key: string]: string[];
};

const GetPosts = () => {
  const [thumbnail, setThumbnail] = useState<string>("");
  const pathname = usePathname();
  const getPathnameQueryKey = (pathname: string) => {
    const queryKeyMap: QueryKeyMap = {
      "/community": ["allPosts"],
      "/community/product": ["productPosts"],
      "/community/restaurant": ["restaurantPosts"],
      "/community/recipe": ["recipePosts"],
      "/community/ohjiwan": ["ohjiwanPosts"],
    };
  
    return queryKeyMap[pathname]
  };
  const queryKey = getPathnameQueryKey(pathname);

  const getCategoryName = (pathname: string) => {
    if (pathname === "/community/product") {
      return "제품";
    } else if (pathname === "/community/restaurant") {
      return "식당";
    } else if (pathname === "/community/recipe") {
      return "레시피";
    } else if (pathname === "/community/ohjiwan") {
      return "오지완";
    } else return "전체"
  };

  const {
    data: posts,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<ToTalDataType>({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => getPosts(pathname, pageParam),
    getNextPageParam: (lastPage) => {
      // 전체 페이지 개수보다 작을 때 다음 페이지로
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    cacheTime: 300000,
  });
  
  const accumulatePosts = useMemo(() => {
    return posts?.pages
      .map((page) => {
        return page.posts;
      })
      .flat();
      // flat() : 모든 하위 배열 요소를 지정한 깊이까지 재귀적으로 이어붙인 새로운 배열 생성
  }, [posts]);

  const { ref } = useInView({
    threshold: 1,
    onChange: (InView) => {
      if (!InView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  })

  if (isLoading) return <Loading />;
  if (isError) {
    console.error("데이터를 불러오는 중에 오류가 발생했습니다:", isError);
    return "데이터를 불러오는 중에 오류가 발생했습니다.";
  }
  return (
    <section className="flex flex-col mt-10 mb-20 w-[725px]">
      {
        <div className="flex flex-col mb-5 justify-center">
          <h2 className="text-xl flex mb-8">{getCategoryName(pathname)} 글</h2>
          {accumulatePosts?.map((post: PostType) => (
              <div
                key={post.post_uid}
                className="border-t last:border-b flex flex-col justify-between px-4 py-4"
              >
                <div className="flex flex-col space-y-2">
                  <CategoryTag>
                    {post.category}
                  </CategoryTag>
                  <div>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <Link href={`/community/${post.post_uid}`}>
                          <h2 className="font-medium text-lg flex items-center space-x-2 cursor-pointer hover:underline my-2">
                            {post.title}
                          </h2>
                        </Link>
                        <Link href={`/community/${post.post_uid}`}>
                          <p className="text-gray-500 text-sm cursor-pointer hover:underline text-ellipsis line-clamp-2">
                            {removeHtmlTags(post.content)}
                          </p>
                        </Link>
                      </div>
                      {
                        getFirstImage(post.content)
                        ?
                        <div className="flex-shrink-0 w-24 h-24">
                          <img
                            className="flex-shrink-0 w-24 h-24 rounded-md"
                            src={getImgUrl(getFirstImage(post.content))}
                            alt="thumbnail"
                          />
                        </div>
                          :
                          null
                      }
                    </div>
                    <div className="flex justify-between mt-5">
                      <div className="flex space-x-3">
                        <div className="space-x-1 items-center justify-center flex text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                            />
                          </svg>
                          <span>{post.number_comments}</span>
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
                          <span>{post.number_likes}</span>
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
        <div ref={ref} className="w-full h-3" />
    </section>
  );
};

export default GetPosts;