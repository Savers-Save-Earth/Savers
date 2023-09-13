import { Metadata } from "next";
import MyCommentsComp from "./MyCommentsComp";
import Seo from "@/components/Seo";

const MyComments = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <Seo
        title="나의 댓글 | Savers"
        description="회원님이 작성한 댓글 목록입니다."
      />
      <MyCommentsComp id={id} />
    </>
  );
};

export default MyComments;
