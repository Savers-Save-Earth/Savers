"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "@/libs/supabase";

interface FormValue {
  email: string;
  password: string;
}

const PwLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const router = useRouter();

  const loginButtonHandler: SubmitHandler<FormValue> = async (
    data: FormValue,
  ) => {
    const { email, password } = data;
    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("loginData", loginData);

    if (error) {
      console.log(error);
      const errorDescription =
        (error as any).error_description || error.message;
      alert(errorDescription);
    } else {
      alert("로그인⚡️");
      router.push("/");
    }
  };

  return (
    <div className="pt-20">
      <form onSubmit={handleSubmit(loginButtonHandler)}>
        <div>
          <input
            type="email"
            placeholder="메일주소를 입력하세요"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p>메일을 입력하세요</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p>올바른 메일 형식이 아닙니다</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="패스워드를 입력하세요"
            {...register("password", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p>비밀번호를 입력하세요</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p>비밀번호는 최소 6자리 이상입니다</p>
          )}
        </div>

        <button>로그인</button>
      </form>
    </div>
  );
};

export default PwLogin;
