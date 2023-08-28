"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type CommunityComment = Database["public"]["Tables"]["community_comment"]["Row"];
const MyComments = async ({ params }: { params: { id: string } }) => {
  const [userComments, setUserComments] = useState<CommunityComment[]>([]);
  const [loadCount, setLoadCount] = useState<number>(5);
  const router = useRouter();
  // decoded params : 유저 닉네임.
  const decodedParams = decodeURIComponent(params.id);

  useEffect(() => {
    fetchCommunity();
  }, [loadCount]);

  const fetchCommunity = async () => {
    try {
      let { data: comments } = await supabase
        .from("community_comment")
        .select("*")
        .eq("writer_name", decodedParams)
        .range(0, loadCount - 1);

      setUserComments(comments || []);
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
      {userComments?.map((comment) => (
          <div
            className="border-solid border-2 border-blue-900 p-5 m-5"
            key={comment.comment_uid}
          >
            <p>댓글 uid : {comment.comment_uid}</p>
            <p onClick = {() => router.push(`/community/${comment.post_uid}`)}>댓글 내용 : {comment.content}</p>
            <p>등록일: {comment.created_date.slice(0, 10)}</p>
            {/* <p>댓글 쓴 글 uid(네이버카페는 댓글 단 글 제목이 나와 있었음!) {comment.post_uid}</p> */}
          </div>
      ))}
      <button onClick={handleLoadMore}>더 보기</button>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    <div>MyComments</div>
    </>
  )
}

export default MyComments