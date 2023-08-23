import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import Link from "next/link";

type PostType = Database["public"]["Tables"]["community"]["Row"];

export const revalidate = 60;

const GetPosts = async () => {
  const { data: posts } = await supabase
    .from("community")
    .select("*")
    .order("created_date", { ascending: false });
  console.log("getPosts data >> ", posts);
  return (
    <div className="flex flex-col my-10 mx-10">
      {posts?.map((post: PostType) => (
        <div
          key={post.post_uid}
          className="flex justify-between w-3/4 border px-2 py-5 mb-2"
        >
          <span>{post.category}</span>
          <h4 className="cursor-pointer">
            <Link href={`/community/${post.post_uid}`}>
              {post.title}
            </Link>
          </h4>
          <span>{post.created_date}</span>
        </div>
      ))}
    </div>
  );
};

export default GetPosts;

// export const getServerSideProps = async () => {
//   const { data: posts } = await supabase
//     .from("community")
//     .select("*")
//     .order("created_date", { ascending: false });
//   return {
//     props: {
//       posts,
//     }
//   }
// };