import { Metadata } from "next";
import GetPosts from "@/components/community/posts/GetPosts";

export const metadata: Metadata = {
  title: "커뮤니티 메인 | Savers",
  description: "친환경에 대한 다양한 주제에 대해 이야기를 나눠보세요.",
};

const Community = () => {
  return (
    <>
      <GetPosts />
    </>
  );
};

export default Community;