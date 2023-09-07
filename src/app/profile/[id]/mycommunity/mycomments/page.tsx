"use client";
import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import UserComment from "./UserComment";
import NoMyComments from "@/components/profile/NoMyComments";
import Loading from "@/app/loading";
import { fetchMyComments } from "@/api/profile/fetchCommunityData";
import { useQuery } from "@tanstack/react-query";
import NoListToShown from "@/components/profile/NoListShown";
import NoBookmarkedProduct from "@/components/profile/NoBookmarkedProduct";

type CommunityComment =
  Database["public"]["Tables"]["community_comment"]["Row"];
const MyComments = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 5;
  const [userComments, setUserComments] = useState<CommunityComment[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const searchId = params.id;

  const { data: myCommentsData, isFetching: fetchMyCommentsFetching } =
    useQuery<any>(["fetchMyComments", searchId, loadCount], () =>
      fetchMyComments(searchId, loadCount),
    );

  useEffect(() => {
    if (!myCommentsData) return;
    const count = myCommentsData.count;
    const userComments = myCommentsData.myComments;
    setUserComments(userComments);
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
  }, [myCommentsData, loadCount]);

  const handleLoadMore = async () => {
    setLoadCount((prevLoadCount) => prevLoadCount + loadBoundaryValue);
  };
  if (fetchMyCommentsFetching) {
    return <Loading />;
  }
  if (userComments && userComments.length < 1) {
    // return <NoListToShown listProp={"noComments"} />
    return<NoListToShown listProp={"noComments"}/>
  }

  return (
    <div className="space-y-4">
      {userComments.map((comment: any) => (
        <UserComment key={comment.comment_uid} comment={comment} />
      ))}
      {userComments.length > 0 && (
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

export default MyComments;
