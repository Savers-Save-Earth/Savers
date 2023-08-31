"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import UserLikedPost from "./UserLikedPost";


type UserLikedPost = Database["public"]["Tables"]["community"]["Row"];

const MyLikedPosts = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 10;
  const [userLikedPosts, setUserLikedPosts] = useState<UserLikedPost[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const decodedParams = decodeURIComponent(params.id);

  useEffect(() => {
    fetchUser()
  }, [loadCount]);

  const fetchUser = async () => {
    try {
      let { data:user } = await supabase.from("user").select("uid").eq("nickname", decodedParams)
      if (user!.length === 0) {
        console.log("에러난듯??")
setUserLikedPosts([])
return <div>죄송합니다. 에러가 발생했습니다.</div>;
      }
      else {
        console.log("user===>",user)
        fetchCommunity(user![0].uid)
      }

    } catch (error) {
      console.log("error", error)
    }
    
  }
  const fetchCommunity = async (id: string) => {
    try {
      console.log("id",id)
      let { data: posts, count } = await supabase
        .from("like_post")
        .select("*", { count: "exact" })
        .eq("like_user", id)
        .range(0, loadCount - 1);
        console.log("posts=======++>",posts)

        setUserLikedPosts(posts || []);
        if (posts!.length === 0) {
          setUserLikedPosts([]);
          return <div>지금까지 북마크한 글이 없네요!!</div>;
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
  console.log("userLikedPosts--<",userLikedPosts)
  return (
    <div className="space-y-4">
      {userLikedPosts.length === 0 ? (
        <div>지금까지 북마크한 글이 없네요!</div>
      ) : (
        userLikedPosts.map((post) => (
          <UserLikedPost key={post.post_uid} post={post} />
        ))
      )}
      <div className="flex justify-center">
        {loadMoreBtn ? (
          <button
            className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
            onClick={handleLoadMore}
          >
            {loadMoreBtn}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyLikedPosts