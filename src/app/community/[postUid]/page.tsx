"use client";
import { getPostDetail } from "@/api/community/post";
import Loading from "@/app/loading";
import DetailPost from "@/components/community/DetailPost";
import PostComments from "@/components/community/PostComments";
import { Database } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type PostType = Database["public"]["Tables"]["community"]["Row"];

const CommunityPostDetail = () => {
  const { postUid } = useParams() as { postUid: string };
  const { data: postDetail, isLoading } = useQuery<PostType>(
    ["postDetail", postUid],
    () => getPostDetail(postUid),
    { cacheTime: 6000 },
  );

  if (isLoading) return <Loading />  
  return (
    <>
      <DetailPost postDetail={postDetail} postUid={postUid} />
      <PostComments postDetail={postDetail} postUid={postUid} />
    </>
  )
};

export default CommunityPostDetail;