import { Metadata } from "next";
import ModifyingProfile from "./ModifyingProfile";

export const metadata: Metadata = {
  title: "회원정보 수정 | Savers",
  description: "이메일 등 회원 정보를 수정하실 수 있습니다.",
};

const setting = () => {
  return (
      <ModifyingProfile />
  );
};

export default setting;