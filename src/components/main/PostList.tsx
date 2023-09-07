"use client";
import React from "react";
import { useState, useEffect } from "react";
import supabase from "@/libs/supabase";
import { Post, PostType } from "@/types/types";
import { useRouter } from "next/navigation";
import PostBox from "../community/posts/ui/PostBox";

const PostList = () => {
  const [post, setPost] = useState<PostType[]>([]);
  const [showCount, setShowCount] = useState(5);

  const router = useRouter();

  const fetchPost = async () => {
    try {
      const { data } = await supabase.from("community").select();
      // 북마크 숫자대로 정렬
      const sortedData = data?.sort((a, b) => b.number_likes - a.number_likes);

      setPost(sortedData!);
    } catch (error) {
      // console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const showMorePost = () => {
    setShowCount(showCount + 10);
  };

  const getThumbnail = (content: string) => {
    // 이미지 태그를 추출하는 정규식
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/;

    // 정규식에 맞는 첫 번째 이미지 태그를 추출
    const firstImgTag = content?.match(imgRegex);

    // 첫 번째 이미지 태그가 존재하면 src 속성의 내용을 추출
    let srcContent = "";
    if (firstImgTag) {
      const srcMatch = firstImgTag[0].match(/src=["']([^"']+)["']/);
      if (srcMatch && srcMatch[1]) {
        srcContent = srcMatch[1];
      }
    }

    // console.log(firstImgTag);

    return srcContent; // 추출한 src 속성의 내용을 반환합니다.
  };

  return (
    <div className="mt-16">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="text-2xl mb-6 font-semibold">인기있는 글</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          onClick={() => router.push(`/community`)}
          className="cursor-pointer mb-6 "
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.792893 15.7071C0.402369 15.3166 0.402369 14.6834 0.792893 14.2929L7.08579 8L0.792893 1.70711C0.402368 1.31658 0.402368 0.683417 0.792893 0.292893C1.18342 -0.0976315 1.81658 -0.0976315 2.20711 0.292893L9.20711 7.29289C9.59763 7.68342 9.59763 8.31658 9.20711 8.70711L2.20711 15.7071C1.81658 16.0976 1.18342 16.0976 0.792893 15.7071Z"
            fill="#D0D5DD"
          />
        </svg>
      </div>
      {post.slice(0, showCount).map((item) => (
        <PostBox
          key={item.post_uid}
          post={item}
          border="border rounded-xl"
          margin="mb-4"
        />
      ))}
      <div className="flex justify-center">
        {showCount <= post.length && (
          <button
            onClick={showMorePost}
            className="text-gray-500 text-base bg-gray-50 rounded-2xl mt-4 mb-8 "
            style={{ padding: "16px 24px" }}
          >
            더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default PostList;
