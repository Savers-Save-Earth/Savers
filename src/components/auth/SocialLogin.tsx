"use client";
import supabase from "@/libs/supabase";
import React, { useState, useEffect } from "react";
import NicknameMaker from "@/components/auth/NicknameMaker";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type Provider = "google" | "kakao" | "facebook";

const SocialLogin = () => {
  const [user, setUser] = useState<user | null>(null);
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  const signInWithOAuthAndLog = async (provider: Provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: "http://localhost:3000/login/loginloading",
        },
      });

      console.log(data);
      if (error) {
        throw error;
      }

      await getUser();
      alert("로그인⚡️");
    } catch (error) {
      alert(`${provider} 로그인 에러: ${error.message}`);
    }
  };

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log();
    if (!user) {
      setUser(null);
    } else {
      setUser(user);
      console.log(user.id);
      console.log(user.user_metadata);
    }
  };

  useEffect(() => {
    if (user) {
      async function exeGetUserInfo() {
        await getUserInfo();
      }
      exeGetUserInfo();
    }
  }, [user]);

  const getUserInfo = async () => {
    const { data: userInfo } = await supabase
      .from("user")
      .select("id")
      .eq("uid", user!.id)
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
      uid: user!.id,
      email: user!.user_metadata["email"],
      nickname: generatedNickname,
    });
    console.log("userInfo반영");
    setNickname(generatedNickname);
  };

  const generateNickname = () => {
    const nickname = NicknameMaker();
    return nickname;
    console.log(nickname);
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signInWithOAuthAndLog("kakao");
          }}
        >
          <button className="pt-20">kakao</button>
        </form>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signInWithOAuthAndLog("google");
          }}
        >
          <button className="pt-20">google</button>
        </form>
      </div>
    </>
  );
};

export default SocialLogin;
