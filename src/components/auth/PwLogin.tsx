"use client";
import React from "react";
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
      console.error("로그인 에러:", error);
      alert("로그인 실패");
    } else {
      console.log("로그인 성공");
      alert("로그인⚡️");
      router.push("/");
      loginUpdater();
    }
  };

  const loginUpdater = async () => {
    await supabase.from("user").upsert({
      isLogin: true,
      provider: "email",
    });
  };

  return (
    <div className="pt-20">
      <form onSubmit={handleSubmit(loginButtonHandler)}>
        <div>
          <input
            type="email"
            placeholder="메일주소를 입력하세요"
            {...register("email", {
              required: "메일을 입력하세요",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "올바른 메일 형식이 아닙니다",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="패스워드를 입력하세요"
            {...register("password", {
              required: "비밀번호를 입력하세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자리 이상이어야 합니다",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default PwLogin;
