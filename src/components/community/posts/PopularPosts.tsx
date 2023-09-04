"use client";
import { useState } from "react";
import Link from "next/link";

import { getPopularPosts } from "@/api/community/post";
import { useQuery } from "@tanstack/react-query";

import { PostType } from "@/types/types";

import Loading from "@/app/loading";
import { getFirstImage, getImgUrl, removeHtmlTags } from "@/libs/util";
import CategoryTag from "../ui/CategoryTag";

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
    <section className="flex flex-col relative w-full bg-gray-50 p-6 rounded-md">
      <h1 className="text-xl flex mb-2">인기 글</h1>
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
              <Link href={`/community/${post.post_uid}`} key={post.post_uid}>
                <div
                  className="w-[170px] h-[250px] rounded-md p-3 flex flex-col space-y-2"
                  key={post.post_uid}
                >
                  {getFirstImage(post.content) ? (
                    <div>
                      <div className="flex-shrink-0 w-36 h-36 mx-auto">
                        <img
                          className="flex-shrink-0 w-36 h-36 rounded-md"
                          src={getImgUrl(getFirstImage(post.content))}
                          alt="thumbnail"
                        />
                      </div>
                      <h2 className="mt-2 text-md text-gray-800 font-semibold leading-5">
                        {post.title}
                      </h2>
                    </div>
                  ) : (
                    <div>
                      <h2 className="mt-2 text-md text-gray-800 font-semibold leading-5">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-400 mt-2 text-ellipsis line-clamp-5">
                        {removeHtmlTags(post.content)}
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col absolute bottom-4">
                    <CategoryTag>{post.category}</CategoryTag>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      {popularPosts && popularPosts?.length > 4 && currentPage === 1 && (
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
