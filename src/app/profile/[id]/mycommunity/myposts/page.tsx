"use client";
import React, { Suspense, useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { getCommentsNum } from "@/api/community/post";
import { getLikesNum } from "@/api/community/like";
import UserPost from "./UserPost";

type CommunityPost = Database["public"]["Tables"]["community"]["Row"];
const MyPosts = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 10

  const [userPosts, setUserPosts] = useState<CommunityPost[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("더보기")
  // decoded params : 유저 닉네임.
  const decodedParams = decodeURIComponent(params.id);

  useEffect(() => {
    fetchCommunity();
  }, [loadCount]);

  const fetchCommunity = async () => {
    try {
      let { data: posts, count } = await supabase
        .from("community")
        .select("*", { count: 'exact'})
        .eq("author_name", decodedParams)
        .range(0, loadCount - 1);
        setUserPosts(posts || []);
        console.log("count: " + count);

        if(posts!.length > 0) {

        }
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
      console.error("An error occurred:", error); // 예상치 못한 에러 처리
      return false; // 에러 처리 후 함수 종료
    }
  };
  const handleLoadMore = () => {
    setLoadCount((prev) => prev + loadBoundaryValue);
  };


  return (
    <div>
    <form
        className="flex items-center gap-2 self-stretch px-[2px] py-[16px] rounded-lg bg-gray-50"
      >
        <div className="w-full flex flex-[1,0,0%] p-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full flex-[1,0,0%] bg-gray-50 text-{14px} font-normal leading-4 text-gray-900 placeholder-gray-300"
          placeholder="검색어를 입력하세요."
        />
        </div>

      </form>
      {userPosts?.filter(
            (item) =>
              item.title.includes(search.trim())
          )
      .map((post) => (
        <UserPost key={post.post_uid} post={post}/>
      ))}
      <div className="flex justify-center">
      <button className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
      onClick={handleLoadMore}>{loadMoreBtn}</button>
      </div>
    </div>
  );
};

export default MyPosts;
