import Seo from "@/components/Seo";
import GetPosts from "@/components/community/posts/GetPosts";
import { Metadata } from "next";

const CommunityRestaurant = () => {
  return (
    <>
      <Seo title="식당 | Savers" description="맛있는 비건 식당, 카페들을 공유해보세요."  />
      <GetPosts />
    </>
  )
}

export default CommunityRestaurant