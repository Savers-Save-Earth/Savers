"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { getPopularPosts } from "@/api/community/post";
import { useQuery } from "@tanstack/react-query";

import { PostType } from "@/types/types";

import { useIsLaptop } from "@/hooks/useIsLaptop";
import PopularPostBox from "../ui/posts/PopularPostBox";
import PageButton from "../ui/posts/PageButton";
import LoadingPopularPosts from "../ui/common/LoadingPopularPosts";
import { PATHNAME_MAIN, PATHNAME_OHJIWAN, PATHNAME_PRODUCT, PATHNAME_RECIPE, PATHNAME_RESTAURANT } from "@/enums/community";

const PopularPosts = () => {
  const pathname = usePathname();
  const isLaptop = useIsLaptop();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: popularPosts, isLoading } = useQuery<PostType[]>(
    ["popularPosts"],
    () => getPopularPosts(),
    { cacheTime: 300000 },
  );

  const ITEMS_PER_PAGE = 4;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPagePosts = popularPosts?.slice(
    startIndex,
    endIndex,
  ) as Array<PostType>;

  if (isLoading) return <LoadingPopularPosts />;

  return (
    <>
      {pathname === PATHNAME_MAIN
        || pathname === PATHNAME_PRODUCT
        || pathname === PATHNAME_RESTAURANT
        || pathname === PATHNAME_RECIPE
        || pathname === PATHNAME_OHJIWAN ? (
        <section className="mt-10 xl:mt-0 flex flex-col relative w-full bg-gray-50 p-6 rounded-md">
          <h1 className="text-xl flex mb-2">전체 인기 글</h1>
          {isLaptop
            ? null
            : currentPage === 2 && (
                <PageButton
                  reverse={false}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              )}
          <div className="flex items-center justify-center">
            <div className="flex xl:grid xl:grid-cols-4 gap-2.5 overflow-x-auto xl:overflow-hidden no-scrollbar">
              {isLaptop
                ? popularPosts?.map((post: PostType) => (
                    <PopularPostBox key={post.post_uid} post={post} />
                  ))
                : currentPagePosts.map((post: PostType) => (
                    <PopularPostBox key={post.post_uid} post={post} />
                  ))}
            </div>
          </div>
          {isLaptop
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
      ) : null}
    </>
  );
};

export default PopularPosts;
