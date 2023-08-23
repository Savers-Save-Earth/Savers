"use client";
import React from "react";
import { useState, useEffect } from "react";
import supabase from "@/libs/supabase";
import { Post } from "@/types/types";

const PostList = () => {
  const [post, setPost] = useState<Post[]>([]);

  const fetchPost = async () => {
    try {
      const { data } = await supabase.from("community").select();
      console.log(data);
      setPost(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <h1>인기있는 글</h1>
      {post.map((item) => (
        <div key={item.post_uid} className="border border-black">
          <p className="font-bold">{item.title}</p>
          <p>
            {item.content.length > 20
              ? `${item.content.slice(0, 20)}...`
              : item.content}
          </p>
          <p>{item.created_date}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
