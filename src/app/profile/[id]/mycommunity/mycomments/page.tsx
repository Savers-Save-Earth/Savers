"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type CommunityComment =Database["public"]["Tables"]["community_comment"]["Row"];
const MyComments = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 10
  const [userComments, setUserComments] = useState<CommunityComment[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("더보기")
  const router = useRouter();
  const decodedParams = decodeURIComponent(params.id);
  const [commentedPost, setCommentedPost] = useState<CommunityComment>()

  useEffect(() => {
    fetchCommunity();
  }, [loadCount]);

  // const getPostData = async (commentedPostUid: string) => {
  //   try {
  //     let {data : postData} = await supabase.from("community").select("title").eq("post_uid", commentedPostUid)
  //     setCommentedPost(postData![0].title)
  //   } catch (error) {
  //   }
  // } 

  const fetchCommunity = async () => {
    try {
      let { data: comments, count } = await supabase
        .from("community_comment")
        .select("*", { count: 'exact'})
        .eq("writer_name", decodedParams)
        .range(0, loadCount - 1);
        setUserComments(comments || []);
        setIsLoading(false); // 데이터 가져오기 후 로딩 상태를 false로 설정
        // const commentedPostUid = comments[0].post_uid || null
        // if (commentedPostUid) {
        //   getPostData(commentedPostUid)
        // }
        
        if(count && count <= loadBoundaryValue ) {
          setLoadMoreBtn("")
          return
        }
        else if (count! > loadCount) {
          setLoadMoreBtn("더보기")
          return
        }
        else if (count! <= loadCount) {
          if (count! + loadBoundaryValue > loadCount) {
            setLoadMoreBtn("접기")
          }
          else {
            setLoadCount(loadBoundaryValue)
            setLoadMoreBtn("더보기")
          }
          return
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
      <button onClick={handleLoadMore}>{loadMoreBtn}</button>
    </>
  );
};

export default MyComments;

