import GetPosts from "@/components/community/GetPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "레시피 | Savers",
  description: "쩝쩝박사님들의 다양한 채식 레시피를 공유해주세요.",
};

const CommunityRecipe = () => {
  return (
    <GetPosts />
  )
}

export default CommunityRecipe