import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "@/libs/supabase";

interface FormValues {
  email: string;
  password: string;
  nickname: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const [userData, setUserData] = useState<any>(null);

  const signupHandler: SubmitHandler<FormValues> = async (formData) => {
    const { email, password, nickname } = formData;

    try {
      // Check if the email is already registered
      const { data: existingUser, error: existingUserError } = await supabase
        .from("user")
        .select("uid")
        .eq("email", email)
        .single();

      if (existingUser) {
        alert("이미 가입된 메일입니다");
        return;
      }

      const { data: existingNickname, error: existingNicknameError } =
        await supabase
          .from("user")
          .select("uid")
          .eq("nickname", nickname)
          .single();

      if (existingNickname) {
        alert("이미 사용 중인 닉네임입니다");
        return;
      }

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        const errorDescription =
          (error as any).error_description || error.message;
        alert(errorDescription);
        return;
      }

      alert("가입완료!");

      // Automatically log in the user
      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        console.error("로그인에러:", loginError);
      } else {
        setUserData(loginData);
        userInfoUpdater(loginData, nickname);
        router.push("/");
        alert("로그인되었습니다!");
      }
    } catch (error) {
      console.error("가입 및 로그인 에러:", error);
    }
  };

  const userInfoUpdater = async (userData: any, nickname: string) => {
    await supabase.from("user").upsert({
      uid: userData.user!.id,
      email: userData.user!.email,
      nickname: nickname,
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(signupHandler)}>
        <div>
          <input
            id="email"
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Email is required</span>}
        </div>
        <div>
          <input
            id="password"
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Password is required</span>}
        </div>
        <div>
          <input
            id="passwordChecking"
            type="password"
            placeholder="passwordChecking"
            {...register("confirmingPw", {
              required: true,
              validate: (value) => value === passwordRef.current,
            })}
          />
        </div>
        <div>
          <input
            id="nickname"
            type="nickname"
            placeholder="nickname"
            {...register("nickname", { required: true })}
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
