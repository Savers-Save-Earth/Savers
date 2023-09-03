import GetPosts from "@/components/community/GetPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "식당 | Savers",
  description: "맛있는 비건 식당, 카페들을 공유해보세요.",
};

const CommunityRestaurant = () => {
  return (
    <GetPosts />
  )
}

export default CommunityRestaurant