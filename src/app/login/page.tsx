import React from "react";
import SocialLogin from "@/components/auth/SocialLogin";
import NicknameMaker from "@/components/auth/NicknameMaker";
import PwLogin from "@/components/auth/PwLogin";

const login = () => {
  return (
    <>
      <div className="text-gray-900 font-Pretendard text-24 font-semibold">
        로그인/회원가입
      </div>
      <PwLogin />
      <SocialLogin />
    </>
  );
};

export default login;
