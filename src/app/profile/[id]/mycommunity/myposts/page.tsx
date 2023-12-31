import { Metadata } from "next";
import MyPostsComp from "../../../../../components/profile/mycommunity/myposts/MyPostsComp";
import Seo from "@/components/common/Seo";

const MissionDone = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
    <Seo title="내가 쓴 글 | Savers" description= "회원님의 작성글 목록입니다."/>
      <MyPostsComp id = {id} />
    </>
  );
};

export default MissionDone;