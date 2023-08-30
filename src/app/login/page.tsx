import React from "react";
import SocialLogin from "@/components/auth/SocialLogin";
import NicknameMaker from "@/components/auth/NicknameMaker";
import PwLogin from "@/components/auth/PwLogin";

const login = () => {
  return (
    <>
      <PwLogin />
      <SocialLogin />
    </>
  );
};

export default login;
