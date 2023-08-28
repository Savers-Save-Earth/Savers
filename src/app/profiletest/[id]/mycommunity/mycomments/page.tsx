"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type CommunityComment =
  Database["public"]["Tables"]["community_comment"]["Row"];
const MyComments = ({ params }: { params: { id: string } }) => {
  const [userComments, setUserComments] = useState<CommunityComment[]>([]);
  const [loadCount, setLoadCount] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  const router = useRouter();
  const decodedParams = decodeURIComponent(params.id);

  const fetchCommunity = async () => {
    try {
      let { data: comments } = await supabase
        .from("community_comment")
        .select("*")
        .eq("writer_name", decodedParams)
        .range(0, loadCount - 1);

      setUserComments(comments || []);
      setIsLoading(false); // 데이터 가져오기 후 로딩 상태를 false로 설정
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, [loadCount]);

  const handleLoadMore = () => {
    setLoadCount((prev) => prev + 5);
  };

  return (
    <>
      {isLoading ? ( // isLoading이 true이면 로딩 표시를 표시합니다.
        <p>Loading...</p>
      ) : (
        userComments?.map((comment) => (
          <div
            className="border-solid border-2 border-blue-900 p-5 m-5"
            key={comment.comment_uid}
          >
            <p>댓글 uid : {comment.comment_uid}</p>
            <p onClick={() => router.push(`/community/${comment.post_uid}`)}>
              댓글 내용 : {comment.content}
            </p>
            <p>등록일: {comment.created_date.slice(0, 10)}</p>
          </div>
        ))
      )}
      <button onClick={handleLoadMore}>더 보기</button>
    </>
  );
};

export default MyComments;
