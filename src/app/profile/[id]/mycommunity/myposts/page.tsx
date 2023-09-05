"use client";
import React, { Suspense, useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import UserPost from "./UserPost";
import NoMyPosts from "@/components/profile/NoMyPosts";
import Loading from "@/app/loading";

type CommunityPost = Database["public"]["Tables"]["community"]["Row"];
const MyPosts = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 10;

  const [userPosts, setUserPosts] = useState<CommunityPost[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [search, setSearch] = useState("");
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  // decoded params : 유저 닉네임.
  const searchId = params.id;
  // const decodedParams = decodeURIComponent(params.id);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  useEffect(() => {
    fetchCommunity();
  }, [loadCount]);

  const fetchCommunity = async () => {
    try {
      let { data: posts, count } = await supabase
        .from("community")
        .select("*", { count: "exact" })
        .eq("author_uid", searchId)
        .range(0, loadCount - 1);
      setUserPosts(posts || []);
      // console.log("count: " + count);
      setIsLoading(false);
      if (posts!.length === 0) {
        setUserPosts([]);

        return <div>지금까지 작성한 글이 없네요!!</div>;
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
        <Loading />
      ) : userPosts.length === 0 ? (
        <NoMyPosts />
      ) : (
        <>
          <form className="flex items-center gap-2 self-stretch px-[2px] py-[16px] rounded-lg bg-gray-50">
            <div className="w-full flex flex-[1,0,0%] p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4C6.93913 4 5.92172 4.42143 5.17157 5.17158C4.42143 5.92172 4 6.93914 4 8C4 9.06087 4.42143 10.0783 5.17157 10.8284C5.92172 11.5786 6.93913 12 8 12C9.06087 12 10.0783 11.5786 10.8284 10.8284C11.5786 10.0783 12 9.06087 12 8C12 6.93914 11.5786 5.92172 10.8284 5.17158C10.0783 4.42143 9.06087 4 8 4ZM2 8C1.99988 7.05571 2.22264 6.12472 2.65017 5.28274C3.0777 4.44077 3.69792 3.7116 4.4604 3.15453C5.22287 2.59746 6.10606 2.22822 7.03815 2.07684C7.97023 1.92546 8.92488 1.99621 9.82446 2.28335C10.724 2.57049 11.5432 3.06591 12.2152 3.7293C12.8872 4.39269 13.3931 5.20534 13.6919 6.10114C13.9906 6.99693 14.0737 7.9506 13.9343 8.88456C13.795 9.81852 13.4372 10.7064 12.89 11.476L17.707 16.293C17.8892 16.4816 17.99 16.7342 17.9877 16.9964C17.9854 17.2586 17.8802 17.5094 17.6948 17.6948C17.5094 17.8802 17.2586 17.9854 16.9964 17.9877C16.7342 17.99 16.4816 17.8892 16.293 17.707L11.477 12.891C10.5794 13.5293 9.52335 13.9082 8.42468 13.9861C7.326 14.0641 6.22707 13.8381 5.2483 13.333C4.26953 12.8278 3.44869 12.063 2.87572 11.1224C2.30276 10.1817 1.99979 9.10144 2 8Z"
                  fill="#D0D5DD"
                />
              </svg>
              <input
                type="text"
                value={search || ""}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full flex-[1,0,0%] bg-gray-50 text-{14px} font-normal leading-4 text-gray-900 placeholder-gray-300 outline-none"
                placeholder="검색어를 입력하세요."
              />
            </div>
          </form>
          {userPosts
            ?.filter((item) => item.title.includes(search.trim()))
            .map((post) => (
              <UserPost key={post.post_uid} post={post} />
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
        </>
      )}
    </div>
  );
};

export default MyPosts;
