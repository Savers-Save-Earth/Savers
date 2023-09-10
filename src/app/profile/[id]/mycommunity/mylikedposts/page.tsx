"use client";

import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import UserLikedPost from "./UserLikedPost";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoritePosts } from "@/api/profile/fetchCommunityData";
import NoListToShown from "@/components/profile/NoListShown";
import LoadingMyBookmarkedPost from "@/components/profile/ui/LoadingMyBookmarkedPost";
import { LikePost, PostType } from "@/types/types";

type UserLikedPost = Database["public"]["Tables"]["community"]["Row"];

const MyLikedPosts = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 10;
  const [userLikedPosts, setUserLikedPosts] = useState<LikePost[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const searchId = params.id;

  const { data: favoritePostData, isFetching: favoritePostDataFetching } =
    useQuery(["fetchFavoritePosts", searchId, loadCount], () =>
      fetchFavoritePosts(searchId, loadCount),
    );

  useEffect(() => {
    if (!favoritePostData) return;
    const count = favoritePostData.count;
    const userLikedPosts = favoritePostData.favoritePosts
    setUserLikedPosts(userLikedPosts);
    if (count && count <= loadBoundaryValue) {
      setLoadMoreBtn("");
      return;
    } else if (count! > loadCount) {
      setLoadMoreBtn("더보기");
      return;
    } else if (count! <= loadCount) {
      if (count! + loadBoundaryValue > loadCount) {
        setLoadMoreBtn("접기");
      } else {
        setLoadCount(loadBoundaryValue);
        setLoadMoreBtn("더보기");
      }
      return;
    }
  }, [favoritePostData, loadCount]);

  const handleLoadMore = async () => {
    setLoadCount((prevLoadCount) => prevLoadCount + loadBoundaryValue);
  };

  if (favoritePostDataFetching) {
    return <LoadingMyBookmarkedPost />;
  }
  if (userLikedPosts && userLikedPosts.length < 1) {
    return <NoListToShown listProp={"noBookmarkedPost"} />
  }

  return (
    <div className="space-y-4">
      {userLikedPosts.map((post) => (
        <UserLikedPost key={post.post_uid} post={post} />
      ))}
      {userLikedPosts.length > 0 && (
        <div className="flex justify-center">
          <button
            className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
            onClick={handleLoadMore}
          >
            {loadMoreBtn}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyLikedPosts;
