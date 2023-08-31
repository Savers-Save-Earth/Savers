import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type PostType = Database["public"]["Tables"]["community"]["Row"];

export default function UserComment({ comment }: any) {
  
  const [commentPost, setCommentPost] = useState<any>();
  useEffect(() => {
    const getPostDetail = async (post_uid: string) => {
      console.log("post_uid==>",post_uid)
        const { data: postTitle } = await supabase
          .from("community")
          .select("title")
          .eq("post_uid", post_uid)
          console.log("postTitle==>",postTitle)
          if (postTitle!.length > 0) {
            setCommentPost(postTitle![0].title)
          }
          
        return postTitle

    }
    getPostDetail(comment.post_uid)
  },[])
  console.log("comment==>",comment)
  console.log("commentPost==>",commentPost)
  return (
    <div key={comment.comment_uid}>
      <p>{comment.comment_uid}</p>
      <p>{commentPost}</p>
    </div>
          
  );
}
