"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type UserLikedPost = Database["public"]["Tables"]["like_post"]["Row"];

const MyLikedPosts = ({ params }: { params: { id: string } }) => {
  const [userLikedPosts, setUserLikedPosts] = useState<UserLikedPost[]>([]);
  const [loadCount, setLoadCount] = useState<number>(5);
  const router = useRouter();
  const decodedParams = decodeURIComponent(params.id);
;
  useEffect(() => {
    fetchCommunity();
  }, [loadCount]);

  const fetchCommunity = async () => {
    try {
      let { data: posts } = await supabase
        .from("like_post")
        .select("*")
        .eq("author_name", decodedParams)
        .range(0, loadCount - 1);

        setUserLikedPosts(posts || []);
    } catch (error) {
      console.error("An error occurred:", error); // 예상치 못한 에러 처리
      return false; // 에러 처리 후 함수 종료
    }
  };
  const handleLoadMore = () => {
    setLoadCount((prev) => prev + 5);
  };
  return (
    <>
      {userLikedPosts?.map((post) => (
          <div
            className="border-solid border-2 border-blue-900 p-5 m-5"
            key={post.post_uid}
          >
            <p>글 uid : {post.post_uid}</p>
            <p onClick = {() => router.push(`/community/${post.post_uid}`)}>글 제목 : {post.post_uid}</p>
            {/* <p>등록일: {post.created_date.slice(0, 10)}</p> */}
          </div>
      ))}
      <button onClick={handleLoadMore}>더 보기</button>
      <div>MyLikedPost</div>
      <div>MyLikedPost</div>
      <div>MyLikedPost</div>
      <div>MyLikedPost</div>
      <div>MyLikedPost</div>
      <div>MyLikedPost</div>
      <div>MyLikedPost</div>
    </>
  );
};

export default MyLikedPosts