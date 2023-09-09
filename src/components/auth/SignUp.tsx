import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "@/libs/supabase";
import { ToastError, ToastSuccess, ToastWarn } from "@/libs/toastifyAlert";
import { useIsMobile } from "@/hooks/useIsMobile";

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

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
    const { email, password, nickname, passwordConfirmation } = formData;

    try {
      const { data: existingUser, error: existingUserError } = await supabase
        .from("user")
        .select("uid")
        .eq("email", email)
        .single();

      if (existingUser) {
        ToastWarn("이미 가입된 메일입니다");
        return;
      }

      const { data: existingNickname, error: existingNicknameError } =
        await supabase
          .from("user")
          .select("uid")
          .eq("nickname", nickname)
          .single();

      if (existingNickname) {
        ToastWarn("이미 사용 중인 닉네임입니다");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        const errorDescription =
          (error as any).error_description || error.message;
        ToastError(errorDescription);
        return;
      }

      ToastSuccess("회원가입이 완료되었습니다.");

      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
      } else {
        setUserData(loginData);
        userInfoUpdater(loginData, nickname);
        router.push("/");
      }
    } catch (error) {}
  };

  const userInfoUpdater = async (userData: any, nickname: string) => {
    await supabase.from("user").upsert({
      uid: userData.user!.id,
      email: userData.user!.email,
      nickname: nickname,
    });
  };

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-10 pt-28">
          <form onSubmit={handleSubmit(signupHandler)}>
            <div className="flex flex-col items-center gap-4 self-stretch">
              <div className="items-center">
                <label className="w-24 shrink-0 flex items-center text-sm mb-1">
                  이메일
                </label>

                <div className="text-sm flex flex-grow flex-col">
                  <input
                    id="email"
                    type="email"
                    placeholder="이메일 입력"
                    {...register("email", {
                      required: "이메일을 입력하세요",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "올바른 메일 형식이 아닙니다",
                      },
                    })}
                    className="flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none mb-1"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="items-center gap-2">
                <label className="w-24 shrink-0 flex items-center text-sm mb-1">
                  비밀번호
                </label>
                <div className="flex flex-grow flex-col">
                  <input
                    id="password"
                    type="password"
                    placeholder="8자리 이상 영문, 숫자 포함"
                    {...register("password", { required: true })}
                    className="text-sm flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none mb-1"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      비밀번호 조건에 맞게 입력해주세요
                    </span>
                  )}
                </div>
              </div>

              <div className="items-center">
                <label className="w-24 shrink-0 text-sm mb-1">
                  비밀번호 확인
                </label>
                <div className="flex flex-grow flex-col">
                  <input
                    id="passwordChecking"
                    type="password"
                    placeholder="비밀번호 확인"
                    {...register("passwordConfirmation", {
                      required: true,
                      validate: (value) => value === passwordRef.current,
                    })}
                    className="text-sm flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none mb-1"
                  />
                  {errors.passwordConfirmation &&
                    errors.passwordConfirmation.type === "required" && (
                      <span className="text-red-500 text-xs">
                        비밀번호 확인을 입력하세요
                      </span>
                    )}
                  {errors.passwordConfirmation &&
                    errors.passwordConfirmation.type === "validate" && (
                      <span className="text-red-500 text-xs">
                        비밀번호가 일치하지 않습니다
                      </span>
                    )}
                </div>
              </div>

              <div className="items-center">
                <label className="w-24 shrink-0 flex items-center text-sm mb-1">
                  닉네임
                </label>
                <div className="flex flex-grow flex-col">
                  <input
                    id="nickname"
                    type="nickname"
                    placeholder="닉네임 입력"
                    {...register("nickname", { required: true, maxLength: 20 })}
                    className="text-sm flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none mb-1"
                  />
                  {errors.nickname && errors.nickname.type === "required" && (
                    <span className="text-red-500 text-xs">
                      닉네임을 입력해주세요
                    </span>
                  )}
                  {errors.nickname && errors.nickname.type === "maxLength" && (
                    <span className="text-red-500 text-xs">
                      20자 이내로 작성해주세요
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 flex w-80 h-12 justify-center items-center border rounded-xl bg-gray-900 text-white hover:bg-gray-700"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-10 pt-28">
          <h1 className="text-2xl text-gray-900 font-semibold">회원가입</h1>

          <form onSubmit={handleSubmit(signupHandler)}>
            <div className="flex flex-col items-center gap-4 self-stretch">
              <div className="flex items-center gap-2 mb-4">
                <label className="w-24 shrink-0 flex items-center text-sm">
                  이메일
                </label>
                <div className="flex flex-grow flex-col">
                  <input
                    id="email"
                    type="email"
                    placeholder="이메일 입력"
                    {...register("email", {
                      required: "이메일을 입력해주세요",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "이메일 형식에 맞게 입력해주세요",
                      },
                    })}
                    className="text-sm flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none mb-1"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <label className="text-sm w-24 shrink-0 flex items-center">
                  비밀번호
                </label>
                <div className="flex flex-grow flex-col">
                  <input
                    id="password"
                    type="password"
                    placeholder="8자리 이상 영문, 숫자 포함"
                    {...register("password", {
                      required: "비밀번호를 입력해주세요",

                      pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                        message: "비밀번호 조건에 맞게 입력해주세요",
                      },
                    })}
                    className="text-sm flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none mb-1"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <label className="text-sm w-24 shrink-0">비밀번호 확인</label>
                <div className="flex flex-grow flex-col">
                  <input
                    id="passwordChecking"
                    type="password"
                    placeholder="비밀번호 확인"
                    {...register("passwordConfirmation", {
                      required: "비밀번호를 입력해주세요",
                      validate: {
                        value: value === passwordRef.current,
                        message: "비밀번호가 일치하지 않습니다",
                      },
                    })}
                    className="text-sm flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none mb-1"
                  />

                  {errors.passwordConfirmation && (
                    <span className="text-red-500 text-xs">
                      {errors.passwordConfirmation.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <label className="text-sm w-24 shrink-0 flex text-start">
                  닉네임
                </label>
                <div className="flex flex-grow flex-col">
                  <input
                    id="nickname"
                    type="nickname"
                    placeholder="닉네임 입력"
                    {...register("nickname", {
                      required: "닉네임을 입력해주세요",
                      maxLength: {
                        value: 20,
                        message: "20글자를 초과할 수 없습니다",
                      },
                    })}
                    className="text-sm flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none mb-1"
                  />
                  {errors.nickname && (
                    <span className="text-red-500 text-xs">
                      {errors.nickname.message}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 flex w-[424px] h-12 justify-center items-center border rounded-xl bg-gray-900 text-white hover:bg-gray-700"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUp;
