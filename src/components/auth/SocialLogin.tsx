"use client";
import supabase from "@/libs/supabase";
import React, { useState } from "react";
import NicknameMaker from "@/components/auth/NicknameMaker";
import { Database } from "@/types/supabase";

type Provider = "google" | "kakao" | "facebook";

const SocialLogin = () => {
  const [user, setUser] = useState<user | null>(null);

  const signInWithOAuthAndLog = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });

    if (error) {
      alert(`${provider} 로그인 에러:`, error);
    } else {
      alert("로그인⚡️");
      getUser();
      getUserInfo();
    }
  };

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
    } else {
      setUser(user);
      console.log(user.id);
      console.log(user.user_metadata);
    }
  };

  const getUserInfo = async () => {
    const { data: userInfo } = await supabase
      .from("users")
      .select("id")
      .single();
    if (userInfo) {
      console.log("유저정보등록되어있음");
      return;
    } else {
      updateUserInfo();
    }
  };

  const updateUserInfo = async () => {
    await supabase.from("user").insert({
      id: user!.id,
      email: user!.user_metadata["email"],
      grade: "basic",
      nickname: user!.user_metadata["name"],
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithOAuthAndLog("kakao");
        }}
      >
        <button>kakao</button>
      </form>
    </>
  );
};

export default SocialLogin;
