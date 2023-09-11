import { Metadata } from "next";
import MyCommentsComp from "./MyCommentsComp";

export const metadata: Metadata = {
  title: "나의 댓글 | Savers",
  description: "회원님이 작성한 댓글 목록입니다.",
};

const MyComments = ({ params: { id } }: { params: { id: string } }) => {
  return (
      <MyCommentsComp id = {id} />
  );
};

export default MyComments;