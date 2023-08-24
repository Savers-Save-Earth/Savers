"use client";
import React from "react";
import { useState, useEffect } from "react";
import supabase from "@/libs/supabase";
import { Post } from "@/types/types";

const PostList = () => {
  const [post, setPost] = useState<Post[]>([]);
  const [showCount, setShowCount] = useState(3);

  const fetchPost = async () => {
    try {
      const { data } = await supabase.from("community").select();
      setPost(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const showMorePost = () => {
    setShowCount(showCount + 3);
  };

  return (
    <div className="p-24 items-start gap-16 self-stretch">
      <h1 className="text-2xl">인기있는 글</h1>
      {post.slice(0, showCount).map((item) => (
        <div
          key={item.post_uid}
          className="rounded-lg border border-gray-200 bg-white p-4 mt-5"
        >
          <p className="font-bold text-lg ">{item.title}</p>
          <p className="text-base text-gray-500">
            {item.content.length > 20
              ? `${item.content.replace(/<[^>]*>/g, "").slice(0, 20)}...`
              : item.content.replace(/<[^>]*>/g, "")}
          </p>
          <p className="mt-2 text-gray-500">{item.created_date}</p>
        </div>
      ))}
      <button onClick={showMorePost}>
        {showCount <= post.length ? "더보기" : "더 이상 게시글이 없습니다."}
      </button>
    </div>
  );
};

export default PostList;
