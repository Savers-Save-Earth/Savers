"use client";
import React from "react";
import { useState, useEffect } from "react";
import supabase from "@/libs/supabase";
import { Post } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

const PostList = () => {
  const [post, setPost] = useState<Post[]>([]);
  const [showCount, setShowCount] = useState(3);

  const fetchPost = async () => {
    try {
      const { data } = await supabase.from("community").select();

      const { data: likeCount } = await supabase.from("like_post").select();
      if (data) {
        // 북마크 숫자 세는 로직
        const updatedData = data.map((item) => ({
          ...item,
          like_count: likeCount?.filter((i) => i.post_uid === item.post_uid)
            .length,
        }));

        // 북마크 숫자대로 정렬
        const sortedData = updatedData.sort(
          (a, b) => b.like_count - a.like_count,
        );

        setPost(sortedData);
        console.log(sortedData);
      }
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

  const sortedPost = post.sort((a, b) => b.created_date - a.created_date);

  return (
    <div className="p-24 items-start gap-16 self-stretch">
      <h1 className="text-2xl">인기있는 글</h1>
      {post.slice(0, showCount).map((item) => (
        <div
          key={item.post_uid}
          className="rounded-lg border border-gray-200 bg-white p-4 mt-5"
        >
          <p>{item.category}</p>
          <p className="font-bold text-lg ">{item.title}</p>
          <p className="text-base text-gray-500">
            {item.content.length > 20
              ? `${item.content.replace(/<[^>]*>/g, "").slice(0, 20)}...`
              : item.content.replace(/<[^>]*>/g, "")}
          </p>
          <span className="mt-2 text-gray-500">{item.created_date}</span>
          <span className="text-sm ml-2">
            <FontAwesomeIcon
              icon={faBookmark}
              size="xs"
              style={{ color: "#000000", marginRight: "5px" }}
            />
            {item.like_count}
          </span>
        </div>
      ))}
      <button onClick={showMorePost}>
        {showCount <= post.length ? "더보기" : "더 이상 게시글이 없습니다."}
      </button>
    </div>
  );
};

export default PostList;
