"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

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
    <>
    <div>MyPosts</div>
    <form
        className="rounded-lg flex p-2 items-center gap-2 bg-gray-100"
        style={{ width: "350px", float: "right" }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-100"
          style={{ width: "300px", outline: "none" }}
          placeholder="검색어를 입력하세요."
        />
      </form>
      {userPosts?.filter(
            (item) =>
              item.title.includes(search.trim())
          )
      .map((post) => (
          <div
            className="border-solid border-2 border-blue-900 p-5 m-5"
            key={post.post_uid}
          >
            <p>글 uid : {post.post_uid}</p>
            <p onClick = {() => router.push(`/community/${post.post_uid}`)}>글 제목 : {post.title}</p>
            <p>등록일: {post.created_date.slice(0, 10)}</p>
          </div>
      ))}
      <button onClick={handleLoadMore}>{loadMoreBtn}</button>
    </>
  );
};

export default MyPosts;
