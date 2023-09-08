"use client";
import { useState } from "react";

import { getPopularPosts } from "@/api/community/post";
import { useQuery } from "@tanstack/react-query";

import { PostType } from "@/types/types";

import { useIsMobile } from "@/hooks/useIsMobile";
import PopularPostBox from "./ui/PopularPostBox";
import Loading from "@/app/loading";
import PageButton from "./ui/PageButton";

const PopularPosts = () => {
  const isMobile = useIsMobile();
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
  const currentPagePosts = popularPosts?.slice(startIndex, endIndex) as Array<PostType>;

  return (
    <section className="mt-10 xl:mt-0 flex flex-col relative w-full bg-gray-50 p-6 rounded-md">
      <h1 className="text-xl flex mb-2">인기 글</h1>
      {isMobile
        ? null
        : currentPage === 2 && (
            <PageButton
              reverse={false}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            />
          )}
      <div className="flex items-center justify-center">
        <div className="flex xl:grid xl:grid-cols-4 gap-2.5 overflow-x-auto xl:overflow-hidden no-scrollbar">
          {isMobile
            ? popularPosts?.map((post: PostType) => (
              <PopularPostBox key={post.post_uid} post={post} />
              ))
            : currentPagePosts.map((post: PostType) => (
                <PopularPostBox key={post.post_uid} post={post} />
              ))}
        </div>
      </div>
      {isMobile
        ? null
        : popularPosts &&
          popularPosts?.length > 4 &&
          currentPage === 1 && (
            <PageButton
              reverse={true}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            />
          )}
    </section>
  );
};

export default PopularPosts;
