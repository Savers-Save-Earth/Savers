import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import LoadingMyBookmarkedPost from "@/components/profile/ui/LoadingMyBookmarkedPost";
import { getFirstImage, getImgUrl } from "@/libs/util";
import { useQuery } from "@tanstack/react-query";
import {
  fetchFavoritePosts,
  fetchPostsByPostUid,
} from "@/api/profile/fetchCommunityData";
import { LikePostProps } from "@/types/types";
import Image from "next/image";

export default function UserLikedPost({ post }: LikePostProps) {
  const searchId = post.post_uid;
  const { data: favoritePostData, isFetching: favoritePostDataFetching } =
    useQuery(["fetchFavoritePostContent", searchId], () =>
      fetchPostsByPostUid(searchId),
    );

  if (favoritePostDataFetching) {
    return;
  }
  const includeImage = getFirstImage(favoritePostData![0].content);
  const firstImgUrl = getImgUrl(includeImage);

  return (
    <div className="flex flex-col items-start p-6 gap-4 self-stretch rounded-2xl bg-white border border-gray-200">
      {favoritePostData!.length > 0 ? (
        <>
          <div className="w-full flex flex-row justify-between items-center gap-2">
            <div>
              <div className="flex items-center gap-2 self-stretch hover:underline mb-2">
                <div className="flex-[1,0,0%]">
                  <p
                    className={`overflow-hidden text-gray-900 text-ellipsis text-[16px] font-semibold leading-4 cursor-pointer`}
                    onClick={() =>
                      window.open(`/community/${favoritePostData![0].post_uid}`)
                    }
                  >
                    {/* md 이하의 크기에서만 글자수를 8자로 제한하고 '...'을 표시 : lg는 css용어이기 때문에 템플릿 리터럴로 조건을 주려면 */}
                    {/* 직접 브라우저 너비를 지칭하는 window.innerWidth를 조건분기로 사용해야 한다. */}
                    {window.innerWidth < 768
                      ? favoritePostData![0].title.length > 15
                        ? favoritePostData![0].title.slice(0, 15) +
                          "..." +
                          `[${favoritePostData![0].number_comments}]`
                        : favoritePostData![0].title
                      : favoritePostData![0].title +
                        `[${favoritePostData![0].number_comments}]`}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center self-stretch text-gray-400">
                <p>
                  등록일&nbsp;{favoritePostData![0].created_date.slice(0, 10)}
                </p>
              </div>
            </div>

            <div>
              {includeImage ? (
                <div className="relative flex-shrink-0 w-10 h-10 sm:w-24 sm:h-24 ml-2 bg-gray-50 rounded-md overflow-hidden">
                  <Image src={firstImgUrl} alt="thumbnail" fill />
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <p>북마크한 글이 없네요!</p>
      )}
    </div>
  );
}
