"use client";
import React from "react";
import { useState, useEffect } from "react";
import supabase from "@/libs/supabase";
import { Post } from "@/types/types";
import { useRouter } from "next/navigation";
import { updateComment } from "@/api/community/comment";

const PostList = () => {
  const [post, setPost] = useState<Post[]>([]);
  const [showCount, setShowCount] = useState(5);

  const router = useRouter();

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

      const { data: commentData } = await supabase
        .from("community_comment")
        .select();

      if (commentData) {
        // 댓글 숫자 세는 로직
        const updatedCommentData = commentData.map((item) => ({
          ...item,
          comment_count: commentData.filter((i) => i.post_uid === item.post_uid)
            .length,
        }));

        console.log(updatedCommentData);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const showMorePost = () => {
    setShowCount(showCount + 10);
  };

  return (
    <div className="mt-16">
      <h1 className="text-2xl mb-6">인기있는 글</h1>
      {post.slice(0, showCount).map((item) => (
        <div
          key={item.post_uid}
          className="rounded-2xl border border-gray-200 bg-white p-4 mb-4 cursor-pointer"
          onClick={() => router.push(`/community/${item.post_uid}`)}
        >
          <div className="inline-block">
            <p
              className="text-[12px] bg-gray-50 rounded-2xl mb-[6px]"
              style={{
                padding: "4px 8px",
                lineHeight: "14px",
                display: "inline-block",
              }}
            >
              {item.category}
            </p>
          </div>

          <p className="font-bold text-base mb-[6px] text-gray-900">
            {item.title}
          </p>
          <p className="text-base text-gray-500">
            {item.content.length > 190
              ? `${item.content.replace(/<[^>]*>/g, "").slice(0, 190)}...`
              : item.content.replace(/<[^>]*>/g, "")}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <img
                src="/assets/bookmark.png"
                className="inline-block mr-0.5"
                style={{ height: "auto", verticalAlign: "middle" }}
                alt="Icon"
              />
              <span className="text-sm text-gray-400">{item.like_count}</span>
              <img
                src="/assets/comment.png"
                className="inline-block mr-0.5 ml-2"
                style={{ height: "auto", verticalAlign: "middle" }}
                alt="Icon"
              />
              <span className="text-sm text-gray-400">
                {item.comment_count}
              </span>
            </div>
            <span className="mt-2 text-gray-300 font-[14px]">
              {`${item.created_date}`.slice(0, 11)}
            </span>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        {showCount <= post.length && (
          <button
            onClick={showMorePost}
            className="text-gray-500 text-base bg-gray-50 rounded-2xl mt-4 mb-8"
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
