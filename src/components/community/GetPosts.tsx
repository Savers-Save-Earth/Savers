// import supabase from "@/libs/supabase";
// import { Database } from "@/types/supabase";
// import Link from "next/link";

// type PostType = Database["public"]["Tables"]["community"]["Row"];

// export const revalidate = 60;

// const GetPosts = async () => {
//   const { data: posts } = await supabase
//     .from("community")
//     .select("*")
//     .order("created_date", { ascending: false });
//   console.log("getPosts data >> ", posts);
//   if (!posts) { throw new Error("게시글을 불러오는데 실패하였습니다.")}
//   return (
//     <div className="flex flex-col my-10 mx-auto items-center justify-center">
//       {posts?.map((post: PostType) => (
//         <div
//           key={post.post_uid}
//           className="flex justify-between w-3/4 border px-4 py-7 mb-2 rounded-md"
//         >
//           <div className="flex">
//             <span className="w-32">{post.category}</span>
//             <h4 className="cursor-pointer hover:text-green-400">
//               <Link href={`/community/${post.post_uid}`}>
//                 {post.title}
//               </Link>
//             </h4>
//           </div>
//           <span>{post.created_date}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GetPosts;