import { Metadata } from "next";
import ModifyingProfile from "../../../../components/profile/setting/ModifyingProfile";
import Seo from "@/components/common/Seo";

const setting = () => {
  return (
    <>
      <Seo title="회원정보 수정 | Savers" description= "이메일 등 회원 정보를 수정하실 수 있습니다."/>
      <ModifyingProfile />
    </>
  );
};

export default setting;