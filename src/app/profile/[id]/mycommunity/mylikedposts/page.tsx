"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import UserLikedPost from "./UserLikedPost";
import NoBookmarkedPost from "@/components/profile/NoBookmarkedPost";

type UserLikedPost = Database["public"]["Tables"]["community"]["Row"];

const MyLikedPosts = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 5;
  const [userLikedPosts, setUserLikedPosts] = useState<UserLikedPost[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const decodedParams = decodeURIComponent(params.id);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    fetchUser();
  }, [loadCount]);

  const fetchUser = async () => {
    try {
      let { data: user } = await supabase
        .from("user")
        .select("uid")
        .eq("nickname", decodedParams);
      if (user!.length === 0) {
        setUserLikedPosts([]);
        setIsLoading(false); // 데이터 가져오기 후 로딩 상태를 false로 설정
      } else {
        fetchCommunity(user![0].uid);
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };
  const fetchCommunity = async (id: string) => {
    try {
      let { data: posts, count } = await supabase
        .from("like_post")
        .select("*", { count: "exact" })
        .eq("like_user", id)
        .range(0, loadCount - 1);
      console.log("posts=======++>", posts);
      setIsLoading(false);
      setUserLikedPosts(posts || []);
      if (posts!.length === 0) {
        setUserLikedPosts([]);
      }

      if (posts!.length > 0) {
        
      }
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
    } catch (error) {
      console.error("An error occurred:", error); // 예상치 못한 에러 처리
      return false; // 에러 처리 후 함수 종료
    }
  };
  const handleLoadMore = () => {
    setLoadCount((prev) => prev + loadBoundaryValue);
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="text-center">데이터를 불러오는 중입니다...</div>
      ) : userLikedPosts.length === 0 ? (
        <NoBookmarkedPost />
      ) : (
        userLikedPosts.map((post) => (
          <UserLikedPost key={post.post_uid} post={post} />
        ))
      )}
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

    //   <div className="flex justify-center">
    //     {loadMoreBtn ? (
    //       <button
    //         className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
    //         onClick={handleLoadMore}
    //       >
    //         {loadMoreBtn}
    //       </button>
    //     ) : (
    //       ""
    //     )}
    //   </div>
    // </div>
  );
};

export default MyLikedPosts;
