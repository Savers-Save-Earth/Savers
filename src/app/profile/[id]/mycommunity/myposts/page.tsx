"use client";
import React, { Suspense, useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import { getCommentsNum } from "@/api/community/post";
import { getLikesNum } from "@/api/community/like";
import UserPost from "./UserPost";
import CommentNum from "./CommentNum";

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

        if(posts.length > 0) {

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
    <>
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
        <UserPost post={post}/>
          // <div
          //   className="border-solid border-2 border-blue-900 p-5 m-5"
          //   key={post.post_uid}
          // >
          //   <p>카테고리 : {post.category}</p>
          //   <p>글 uid : {post.post_uid}</p>
          //   <p onClick = {() => window.open(`/community/${post.post_uid}`)}>글 제목 : {post.title}</p>
            
          //   <div className="space-x-1 items-center justify-center flex text-sm text-gray-500">
          //                 <svg
          //                   xmlns="http://www.w3.org/2000/svg"
          //                   fill="none"
          //                   viewBox="0 0 24 24"
          //                   stroke-width="1.5"
          //                   stroke="currentColor"
          //                   className="w-5 h-5"
          //                 >
          //                   <path
          //                     stroke-linecap="round"
          //                     stroke-linejoin="round"
          //                     d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          //                   />
          //                 </svg>
          //                 {/* <Suspense fallback={ <span>0</span>}> */}
          //                 {/* <span>{getCommentsNum(post.post_uid)}</span> */}
          //                 <CommentNum postId={post.post_uid}/>
          //                 {/* </Suspense> */}
          //               </div>

          //               <div className="space-x-1 items-center justify-center flex text-sm text-gray-500">
          //                 <svg
          //                   xmlns="http://www.w3.org/2000/svg"
          //                   fill="none"
          //                   viewBox="0 0 24 24"
          //                   strokeWidth="1.5"
          //                   stroke="currentColor"
          //                   className="w-6 h-6"
          //                 >
          //                   <path
          //                     strokeLinecap="round"
          //                     strokeLinejoin="round"
          //                     d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          //                   />
          //                 </svg>
          //                 <span>{getLikesNum(post.post_uid)}</span>
          //               </div>


          //   <p>등록일: {post.created_date.slice(0, 10)}</p>
          // </div>
      ))}
      <button className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
      onClick={handleLoadMore}>{loadMoreBtn}</button>
    </>
  );
};

export default MyPosts;
