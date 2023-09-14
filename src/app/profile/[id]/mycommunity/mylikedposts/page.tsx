import { Metadata } from "next";
import MyLikedPostsComp from "../../../../../components/profile/mycommunity/mylikedposts/MyLikedPostsComp";
import Seo from "@/components/Seo";

const MissionDone = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
    <Seo title="북마크 글 | Savers" description= "회원님이 북마크한 글 목록입니다."/>
      <MyLikedPostsComp id = {id} />
    </>
  );
};

export default MissionDone;