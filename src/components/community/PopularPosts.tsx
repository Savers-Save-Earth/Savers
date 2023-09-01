"use client";
import { useState } from "react";
import Link from "next/link";

import { getPopularPosts } from "@/api/community/post";
import { useQuery } from "@tanstack/react-query";

import { PostType } from "@/types/types";

import Loading from "@/app/loading";
import { removeHtmlTags } from "@/libs/util";
import CategoryTag from "./CategoryTag";

const PopularPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: popularPosts, isLoading } = useQuery<PostType[]>(
    ["popularPosts"],
    () => getPopularPosts(),
    { cacheTime: 300000 },
  );

  if (isLoading) return <Loading />;

  const ITEMS_PER_PAGE = 4;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPagePosts = popularPosts?.slice(startIndex, endIndex);

  return (
    <section className="flex flex-col relative w-full">
      <h1 className="text-xl flex mb-8">인기 글</h1>
      {currentPage === 2 && (
        <button
          className="z-10 absolute -left-[32px] top-1/2 p-1.5 rounded-full bg-white text-gray-900 shadow-md duration-150 ease-in-out"
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-4 gap-2.5">
          {Array.isArray(currentPagePosts) &&
            currentPagePosts.map((post: PostType) => (
              <Link href={`community/${post.post_uid}`} key={post.post_uid}>
                <div
                  className="w-[170px] h-[250px] border rounded-md p-3  ease-in-out duration-200 shadow-sm"
                  key={post.post_uid}
                >
                  <h2 className="text-base text-gray-800 font-semibold">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-2 text-ellipsis line-clamp-4">
                    {removeHtmlTags(post.content)}
                  </p>
                  <div className="flex flex-col justify-between mt-5 absolute bottom-2 space-y-2">
                    <div className="flex space-x-2.5">
                      <div className="space-x-1 items-center justify-center flex text-xs text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                          />
                        </svg>
                        <span>{post.number_comments}</span>
                      </div>
                      <div className="space-x-1 items-center justify-center flex text-xs text-gray-500">
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
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>
                        <span>{post.number_likes}</span>
                      </div>
                    </div>
                    <CategoryTag>{post.category}</CategoryTag>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {currentPage === 1 && (
        <button
          className="z-10 absolute -right-[32px] top-1/2 p-1.5 rounded-full bg-white text-gray-900 shadow-md duration-150 ease-in-out"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}
    </section>
  );
};

export default PopularPosts;
