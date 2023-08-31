"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import UserComment from "./UserComment";

type CommunityComment =
  Database["public"]["Tables"]["community_comment"]["Row"];
const MyComments = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 10;
  const [userComments, setUserComments] = useState<CommunityComment[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const router = useRouter();
  const decodedParams = decodeURIComponent(params.id);

  useEffect(() => {
    fetchCommunity();
  }, [loadCount]);

  const fetchCommunity = async () => {
    try {
      let { data: comments, count } = await supabase
        .from("community_comment")
        .select("*", { count: "exact" })
        .eq("writer_name", decodedParams)
        .eq("isDeleted", false)
        .range(0, loadCount - 1);
      setUserComments(comments || []);
      setIsLoading(false); // 데이터 가져오기 후 로딩 상태를 false로 설정

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
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setLoadCount((prev) => prev + loadBoundaryValue);
  };

  return (
    <div className="space-y-4">
      {userComments?.map((comment) => (
        <UserComment key={comment.comment_uid} comment={comment}/>
      ))}
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

export default MyComments;
