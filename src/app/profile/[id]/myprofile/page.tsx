import { Metadata } from "next";
import MyProfileComp from "./MyProfileComp";

export const metadata: Metadata = {
  title: "프로필 | Savers",
  description: "일일미션 완료 현황과 내가 획득한 배지를 확인할 수 있습니다.",
};

const MyProfile = ({ params: { id } }: { params: { id: string } }) => {
  return (
      <MyProfileComp id = {id} />
  );
};

export default MyProfile;