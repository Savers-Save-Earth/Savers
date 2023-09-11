import Seo from "@/components/Seo";
import GetPosts from "@/components/community/posts/GetPosts";
import { Metadata } from "next";

const CommunityOhjiwan = () => {
  return (
    <>
      <Seo title="오지완 | Savers" description="오늘의 지구 지킴 완료!" />
      <GetPosts />
    </>
  )
}

export default CommunityOhjiwan