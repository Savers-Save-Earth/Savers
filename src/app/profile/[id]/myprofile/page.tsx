import { Metadata } from "next";
import MyProfileComp from "./MyProfileComp";
import Seo from "@/components/Seo";

const MyProfile = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
    <Seo title="프로필 | Savers" description= "일일미션 완료 현황과 획득한 배지를 확인할 수 있습니다."/>
      <MyProfileComp id = {id} />
    </>
  );
};

export default MyProfile;