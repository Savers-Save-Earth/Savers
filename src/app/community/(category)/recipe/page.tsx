import Seo from "@/components/Seo";
import GetPosts from "@/components/community/posts/GetPosts";
import { Metadata } from "next";

const CommunityRecipe = () => {
  return (
    <>
      <Seo title="레시피 | Savers" description="쩝쩝박사님들의 다양한 채식 레시피를 공유해주세요." />
      <GetPosts />
    </>
  )
}

export default CommunityRecipe