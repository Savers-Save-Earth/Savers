import { Metadata } from "next";
import MyLikedPostsComp from "./MyLikedPostsComp";

export const metadata: Metadata = {
  title: "북마크 글 | Savers",
  description: "회원님이 북마크한 글 목록입니다.",
};

const MissionDone = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <MyLikedPostsComp id = {id} />
    </>
  );
};

export default MissionDone;