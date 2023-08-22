"use client";
import supabase from "@/libs/supabase";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValue {
  email: string;
  password: string;
  confirmingPw: string;
}

type Provider = "google" | "kakao" | "facebook";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithOAuthAndLog = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });
  };

  return (
    <>
      <div>Login</div>
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

export default Login;
