import Seo from "@/components/Seo";
import GetPosts from "@/components/community/GetPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오지완 | Savers",
  description: "오늘의 지구 지킴 완료!",
};

const CommunityOhjiwan = () => {
  return (
    <>
      <GetPosts />
    </>
  )
}

export default CommunityOhjiwan