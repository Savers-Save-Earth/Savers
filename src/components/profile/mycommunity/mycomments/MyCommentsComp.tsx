"use client";

import React, { useEffect, useState } from "react";
import UserComment from "./UserComment";
import { fetchMyComments } from "@/api/profile/fetchCommunityData";
import { useQuery } from "@tanstack/react-query";
import NoListToShown from "@/components/profile/NoListShown";
import LoadingMyComment from "@/components/profile/ui/LoadingMyComment";
import { CommunityComment } from "@/types/types";

const MyCommentsComp = ({ id }: { id: string }) => {
  const loadBoundaryValue = 10;
  const [userComments, setUserComments] = useState<CommunityComment[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const searchId = id;

  const { data: myCommentsData, isFetching: fetchMyCommentsFetching } =
    useQuery(["fetchMyComments", searchId, loadCount], () =>
      fetchMyComments(searchId, loadCount),
    );
  useEffect(() => {
    if (!myCommentsData) return;
    const count = myCommentsData.count;
    const userComments = myCommentsData.myComments as CommunityComment[];
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
    return <LoadingMyComment />;
  }
  if (userComments && userComments.length < 1) {
    return <NoListToShown listProp={"noComments"} />;
  }
  return (
    <div className="space-y-4">
      {userComments.map((comment: CommunityComment) => (
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

export default MyCommentsComp;
