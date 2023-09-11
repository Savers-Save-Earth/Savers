import { Metadata } from "next";
import MyPostsComp from "./MyPostsComp";

export const metadata: Metadata = {
  title: "내가 쓴 글 | Savers",
  description: "회원님의 작성글 목록입니다.",
};

const MissionDone = ({ params: { id } }: { params: { id: string } }) => {
  return (
      <MyPostsComp id = {id} />
  );
};

export default MissionDone;