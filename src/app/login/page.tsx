"use client";
import React, { useEffect, useState } from "react";
import SocialLogin from "@/components/auth/SocialLogin";
import NicknameMaker from "@/components/auth/NicknameMaker";
import PwLogin from "@/components/auth/PwLogin";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/useIsMobile";

const login = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex w-full flex-col items-start gap-10 pt-28 ">
        {!isMobile && (
          <div className="text-2xl pb-16 text-gray-900 font-semibold">
            로그인/회원가입
          </div>
        )}
        <div className="flex flex-col mx-auto items-center justify-center">
          <PwLogin />
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default login;
