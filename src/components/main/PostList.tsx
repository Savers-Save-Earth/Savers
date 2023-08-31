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

        setPost((prevPost) =>
          prevPost.map((postItem) => {
            const updatedItem = updatedCommentData.find(
              (commentItem) => commentItem.post_uid === postItem.post_uid,
            );
            if (updatedItem) {
              return {
                ...postItem,
                comment_count: updatedItem.comment_count,
              };
            }
            return postItem;
          }),
        );
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Icon">
                  <path
                    id="Vector"
                    d="M12.3332 14.4C12.1998 14.4 11.9998 14.3333 11.8665 14.2667L8.33317 12.2667C8.13317 12.1333 7.8665 12.1333 7.6665 12.2667L4.13317 14.2667C3.79984 14.4667 3.4665 14.4667 3.13317 14.2667C2.99984 14.2 2.8665 14.0667 2.79984 13.9333C2.73317 13.8 2.6665 13.6 2.6665 13.4V4C2.6665 3.46667 2.8665 2.93333 3.2665 2.6C3.59984 2.2 4.13317 2 4.6665 2H11.3332C11.8665 2 12.3998 2.2 12.7332 2.6C13.1332 2.93333 13.3332 3.46667 13.3332 4V13.4C13.3332 13.6 13.2665 13.7333 13.1998 13.9333C13.1332 14.0667 12.9998 14.2 12.8665 14.2667C12.6665 14.4 12.5332 14.4 12.3332 14.4ZM7.99984 10.8667C8.33317 10.8667 8.6665 10.9333 8.99984 11.1333L11.9998 12.8667V4C11.9998 3.8 11.9332 3.66667 11.7998 3.53333C11.6665 3.4 11.5332 3.33333 11.3332 3.33333H4.6665C4.4665 3.33333 4.33317 3.4 4.19984 3.53333C4.0665 3.66667 3.99984 3.8 3.99984 4V12.8667L6.99984 11.1333C7.33317 10.9333 7.6665 10.8667 7.99984 10.8667Z"
                    fill="#98A2B3"
                  />
                </g>
              </svg>

              <span className="text-sm text-gray-400">{item.like_count}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 mr-0.5"
              >
                <g id="Icon">
                  <path
                    id="Vector"
                    d="M7.99991 1.33337C7.12443 1.33337 6.25752 1.50581 5.44869 1.84084C4.63985 2.17588 3.90492 2.66694 3.28587 3.286C2.03562 4.53624 1.33324 6.23193 1.33324 8.00004C1.32742 9.53946 1.86044 11.0324 2.83991 12.22L1.50658 13.5534C1.41407 13.6471 1.35141 13.7662 1.32649 13.8955C1.30158 14.0248 1.31552 14.1586 1.36658 14.28C1.42195 14.4 1.51171 14.5008 1.62448 14.5696C1.73724 14.6385 1.86791 14.6723 1.99991 14.6667H7.99991C9.76802 14.6667 11.4637 13.9643 12.714 12.7141C13.9642 11.4638 14.6666 9.76815 14.6666 8.00004C14.6666 6.23193 13.9642 4.53624 12.714 3.286C11.4637 2.03575 9.76802 1.33337 7.99991 1.33337ZM7.99991 13.3334H3.60658L4.22658 12.7134C4.35074 12.5885 4.42044 12.4195 4.42044 12.2434C4.42044 12.0673 4.35074 11.8983 4.22658 11.7734C3.35363 10.9014 2.81003 9.75373 2.68837 8.5259C2.56672 7.29807 2.87454 6.06604 3.5594 5.03972C4.24425 4.0134 5.26377 3.25628 6.44425 2.89736C7.62474 2.53843 8.89315 2.59991 10.0334 3.07132C11.1736 3.54272 12.1151 4.39489 12.6975 5.48264C13.2799 6.57038 13.4672 7.8264 13.2273 9.03671C12.9875 10.247 12.3354 11.3367 11.3823 12.1202C10.4291 12.9037 9.23375 13.3324 7.99991 13.3334Z"
                    fill="#98A2B3"
                  />
                </g>
              </svg>

              <span className="text-sm text-gray-400">
                {item.comment_count ? item.comment_count : 0}
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
