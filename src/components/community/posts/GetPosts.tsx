"use client";
import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/community/post";
import { useInView } from "react-intersection-observer";

import { usePathname } from "next/navigation";

import PostBox from "./ui/PostBox";

import { PostType, ToTalDataType } from "@/types/types";
import {
  PATHNAME_OHJIWAN,
  PATHNAME_PRODUCT,
  PATHNAME_RECIPE,
  PATHNAME_RESTAURANT,
} from "@/enums/community";
import LoadingPosts from "../ui/LoadingPosts";
import { useRecoilValue } from "recoil";
import { searchPostAtom } from "@/libs/atoms";
import supabase from "@/libs/supabase";

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

    return queryKeyMap[pathname];
  };
  const queryKey = getPathnameQueryKey(pathname);

  const { keyword } = useRecoilValue(searchPostAtom);
  console.log("GetPosts keyword >> ", keyword);

  const getCategoryName = (pathname: string) => {
    if (pathname === PATHNAME_PRODUCT) {
      return "제품";
    } else if (pathname === PATHNAME_RESTAURANT) {
      return "식당";
    } else if (pathname === PATHNAME_RECIPE) {
      return "레시피";
    } else if (pathname === PATHNAME_OHJIWAN) {
      return "오지완";
    } else return "전체";
  };

  const {
    data: posts,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ToTalDataType>({
    queryKey: keyword ? ["searchPosts"] : queryKey,
  queryFn: ({ pageParam }) => {
    if (keyword) {
      // 검색어가 있는 경우 검색 결과만 반환
      return getPosts("/community", pageParam, keyword);
    } else {
      // 검색어가 없는 경우 전체 데이터 반환
      return getPosts(pathname, pageParam, null);
    }
  },
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
    },
  });

  if (isLoading) return <LoadingPosts />;
  
  return (
    <section className="flex flex-col mt-10 mb-20 xl:w-[725px]">
      {
        <div className="flex flex-col mb-5 justify-center">
          <h2 className="text-xl flex mb-8">{getCategoryName(pathname)} 글</h2>
          {accumulatePosts ?
            accumulatePosts.length < 1 ?
            <h3 className="text-gray-500">게시글이 존재하지 않습니다.</h3>
              :
              accumulatePosts.map((post: PostType) => (
                <PostBox
                  key={post.post_uid}
                  post={post}
                  border={"last:border-b border-t"}
                />
              ))
            :
            <h3 className="text-gray-500">게시글이 존재하지 않습니다.</h3>
          }
        </div>
      }
      <div ref={ref} className="w-full h-3" />
    </section>
  );
};

export default GetPosts;
