import MyCommentsComp from "../../../../../components/profile/mycommunity/mycomments/MyCommentsComp";
import Seo from "@/components/common/Seo";

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
