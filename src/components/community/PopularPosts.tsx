"use client";

import { getPopularPosts } from "@/api/community/post";
import Loading from "@/app/loading";
import { Database } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";

type PostType = Database["public"]["Tables"]["community"]["Row"];

const PopularPosts = () => {
  const { data: popularPosts, isLoading } = useQuery<PostType[]>(["popularPosts"], () => getPopularPosts(), { staleTime: 300000 });

  if (isLoading) return <Loading />
  return (
    <section>
      <h1 className="text-xl flex mb-8">인기 글</h1>
      {Array.isArray(popularPosts) &&
        popularPosts?.map((post: PostType) => (
          <div key={post.post_uid}>
            {post.title}
          </div>
      ))}
    </section>
  )
}

export default PopularPosts