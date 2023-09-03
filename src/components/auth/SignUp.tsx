import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import supabase from "@/libs/supabase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
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
    const { email, password, nickname, passwordConfirmation } = formData;

    try {
      const { data: existingUser, error: existingUserError } = await supabase
        .from("user")
        .select("uid")
        .eq("email", email)
        .single();

      if (existingUser) {
        toast.warning("이미 가입된 메일입니다");
        return;
      }

      const { data: existingNickname, error: existingNicknameError } =
        await supabase
          .from("user")
          .select("uid")
          .eq("nickname", nickname)
          .single();

      if (existingNickname) {
        toast.warning("이미 사용 중인 닉네임입니다");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        const errorDescription =
          (error as any).error_description || error.message;
        toast.error(errorDescription);
        return;
      }

      toast.success("회원가입이 완료되었습니다.");

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
    <div className="flex w-300 flex-col gap-10 pt-28">
      <h1 className="text-2xl pb-16 text-gray-900  font-semibold">회원가입</h1>

      <div className="flex flex-col items-center gap-16 self-stretch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="142"
          height="24"
          viewBox="0 0 142 24"
          fill="none"
        >
          <path
            d="M18.2402 11.2626C17.4357 10.7263 16.4972 10.4581 15.5586 10.1899C14.486 9.92179 13.5475 9.78771 12.4748 9.65363C11.5363 9.51955 10.7318 9.38548 9.79328 9.11732C8.98881 8.98324 8.31842 8.71508 7.78211 8.44693C7.24579 8.17877 7.11172 7.77654 7.11172 7.10615C7.11172 6.43575 7.51395 5.89944 8.18434 5.49721C8.85473 5.09497 9.92736 4.96089 11.4022 4.96089C12.4748 4.96089 13.5475 5.09497 14.6201 5.36313C15.8268 5.63129 16.8994 6.03352 17.9721 6.70391L20.2514 2.01117C19.1788 1.34078 17.838 0.804469 16.229 0.536313C14.6201 0.134078 13.0112 0 11.4022 0C9.12289 0 7.24579 0.268156 5.63686 0.938547C4.02792 1.60894 2.82121 2.54749 1.88267 3.62011C1.0782 4.69274 0.675961 6.03352 0.675961 7.50838C0.675961 8.84916 0.944118 9.92179 1.34635 10.7263C1.88267 11.5307 2.55306 12.2011 3.35753 12.7374C4.16199 13.2737 5.10054 13.5419 6.03909 13.8101C6.97764 14.0782 8.05026 14.2123 8.98881 14.3464C9.92736 14.4804 10.8659 14.6145 11.6704 14.7486C12.4748 14.8827 13.1452 15.1508 13.6815 15.419C14.2179 15.6872 14.486 16.0894 14.486 16.6257C14.486 17.2961 14.2179 17.8324 13.5475 18.2346C13.0112 18.5028 11.9385 18.771 10.3296 18.771C8.98881 18.771 7.51395 18.6369 6.03909 18.2346C4.56423 17.8324 3.35753 17.2961 2.2849 16.6257L0.139648 21.3184C1.21227 21.9888 2.68713 22.6592 4.43015 23.0615C6.30725 23.4637 8.18434 23.7318 10.1955 23.7318C12.4748 23.7318 14.486 23.4637 16.095 22.7933C17.7039 22.1229 18.9106 21.3184 19.8491 20.2458C20.6536 19.1732 21.1899 17.8324 21.1899 16.4916C21.1899 15.1508 20.9218 14.0782 20.3855 13.2737C19.7151 12.4693 19.0447 11.7989 18.2402 11.2626Z"
            fill="#101828"
          />
          <path
            d="M42.6424 2.54749C40.7654 0.804469 37.9497 0 34.4637 0C32.5866 0 30.8436 0.268156 29.1005 0.670391C27.3575 1.07263 25.7486 1.87709 24.5419 2.68156L26.9553 7.50838C27.7598 6.83799 28.8324 6.30168 29.905 5.89944C31.1117 5.49721 32.3184 5.36313 33.5251 5.36313C35.2681 5.36313 36.6089 5.76536 37.5475 6.56983C38.486 7.3743 38.8883 8.44693 38.8883 9.92179H33.5251C31.2458 9.92179 29.2346 10.1899 27.7598 10.8603C26.2849 11.3966 25.2123 12.2011 24.5419 13.2737C23.8715 14.3464 23.6033 15.5531 23.6033 16.8939C23.6033 18.2346 24.0056 19.4413 24.676 20.514C25.3464 21.5866 26.2849 22.3911 27.6257 23.0615C28.9665 23.5978 30.4413 24 32.3184 24C34.3296 24 36.0726 23.5978 37.2793 22.7933C38.2179 22.257 38.8883 21.5866 39.2905 20.648V23.5978H45.5922V10.1899C45.5922 6.70391 44.6536 4.15642 42.6424 2.54749ZM37.0112 18.5028C36.0726 19.0391 35.1341 19.3073 34.0614 19.3073C32.8547 19.3073 31.9162 19.0391 31.2458 18.6369C30.5754 18.1006 30.3072 17.4302 30.3072 16.6257C30.3072 15.8212 30.5754 15.1508 31.1117 14.7486C31.648 14.2123 32.8547 13.9441 34.3296 13.9441H38.8883V16.0894C38.486 17.162 37.8156 17.9665 37.0112 18.5028Z"
            fill="#101828"
          />
          <path
            d="M94.1285 1.47486C92.3855 0.536313 90.3743 0 88.095 0C85.8156 0 83.6704 0.536313 81.7933 1.60894C79.9162 2.54749 78.4413 4.02235 77.3687 5.76536C76.2961 7.50838 75.7598 9.51955 75.7598 11.933C75.7598 14.2123 76.2961 16.2235 77.3687 18.1006C78.4413 19.8436 80.0503 21.3184 81.9274 22.257C83.9385 23.3296 86.2179 23.8659 88.8994 23.8659C91.0447 23.8659 92.7877 23.5978 94.3966 22.9274C96.0056 22.257 97.3464 21.3184 98.419 20.1117L94.7989 16.2235C93.9944 17.0279 93.1899 17.5642 92.2514 17.8324C91.3128 18.2346 90.2402 18.3687 89.0335 18.3687C87.6927 18.3687 86.486 18.1006 85.4134 17.6983C84.4748 17.162 83.6704 16.4916 83 15.5531C82.7318 15.0168 82.4637 14.4804 82.3296 13.8101H99.7598C99.7598 13.5419 99.7598 13.2737 99.8938 12.8715C99.8938 12.4693 99.8938 12.2011 99.8938 11.933C99.8938 9.38547 99.3575 7.3743 98.2849 5.49721C97.4804 3.75419 96.0056 2.41341 94.1285 1.47486ZM85.0112 5.89944C85.9497 5.36313 86.8883 5.09497 88.095 5.09497C89.3017 5.09497 90.2402 5.36313 91.0447 5.89944C91.8492 6.43575 92.5195 7.10615 93.0559 7.91061C93.324 8.44693 93.5922 9.11732 93.7262 9.92179H82.3296C82.4637 9.2514 82.5977 8.58101 83 8.04469C83.5363 6.97207 84.2067 6.30168 85.0112 5.89944Z"
            fill="#101828"
          />
          <path
            d="M110.888 3.35196V0.402235H104.453V23.4637H111.156V12.4693C111.156 10.324 111.693 8.71508 112.765 7.64246C113.972 6.56983 115.447 6.03352 117.19 6.03352C117.458 6.03352 117.726 6.03352 117.86 6.03352C118.128 6.03352 118.397 6.03352 118.665 6.03352V0C116.52 0 114.642 0.402235 113.168 1.34078C112.363 1.87709 111.559 2.54749 110.888 3.35196Z"
            fill="#101828"
          />
          <path
            d="M140.922 13.2737C140.385 12.4693 139.715 11.7989 138.911 11.3966C138.106 10.8603 137.168 10.5922 136.229 10.324C135.29 10.0559 134.218 9.92179 133.279 9.78771C132.341 9.65363 131.402 9.51955 130.598 9.2514C129.793 9.11732 129.123 8.84916 128.587 8.58101C128.05 8.31285 127.916 7.91061 127.916 7.24022C127.916 6.56983 128.318 6.03352 128.989 5.63128C129.659 5.22905 130.732 5.09497 132.207 5.09497C133.279 5.09497 134.352 5.22905 135.425 5.49721C136.631 5.76536 137.704 6.1676 138.777 6.83799L141.056 2.01117C139.983 1.34078 138.642 0.804469 137.034 0.536313C135.156 0.134078 133.547 0 132.073 0C129.793 0 127.916 0.268156 126.307 0.938547C124.698 1.60894 123.492 2.41341 122.553 3.62011C121.749 4.69274 121.346 6.03352 121.346 7.50838C121.346 8.84916 121.615 9.92179 122.017 10.7263C122.553 11.5307 123.223 12.2011 124.028 12.7374C124.832 13.2737 125.771 13.5419 126.709 13.8101C127.648 14.0782 128.721 14.2123 129.659 14.3464C130.598 14.4804 131.536 14.6145 132.341 14.7486C133.145 14.8827 133.816 15.1508 134.352 15.419C134.888 15.6872 135.156 16.0894 135.156 16.6257C135.156 17.2961 134.888 17.8324 134.218 18.2346C133.547 18.6369 132.475 18.771 131 18.771C129.659 18.771 128.184 18.6369 126.709 18.2346C125.235 17.8324 124.028 17.2961 122.955 16.6257L120.81 21.3184C121.883 21.9888 123.358 22.6592 125.101 23.0615C126.978 23.4637 128.855 23.7318 130.866 23.7318C133.145 23.7318 135.156 23.4637 136.765 22.7933C138.374 22.1229 139.581 21.3184 140.52 20.2458C141.324 19.1732 141.86 17.8324 141.86 16.4916C141.726 15.1508 141.458 14.0782 140.922 13.2737Z"
            fill="#101828"
          />
          <path
            d="M52.7374 20.9388C52.7374 20.9388 60.4211 20.4312 62.1019 15.1009C63.7827 9.77067 64.2629 3.93276 72.6669 0.633074C72.1867 3.67894 72.3308 5.78566 72.6189 8.32388C72.9071 10.8367 73.0271 13.3496 72.3548 15.8116C71.6825 18.3498 70.1217 20.5073 67.8646 21.7003C61.1414 25.2538 54.4182 22.4618 52.7374 20.9388Z"
            fill="url(#paint0_linear_1010_22052)"
          />
          <path
            d="M69.0022 20.9388C69.0022 20.9388 61.3117 20.4312 59.6294 15.1009C57.9471 9.77067 57.4664 3.93276 49.0549 0.633074C49.5355 3.67894 49.3913 5.78566 49.1029 8.32388C48.8386 10.8113 48.7184 13.3242 49.3673 15.7862C50.0643 18.3498 51.6024 20.5073 53.8615 21.7003C60.5907 25.2538 67.3199 22.4618 69.0022 20.9388Z"
            fill="url(#paint1_linear_1010_22052)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1010_22052"
              x1="72.2364"
              y1="0"
              x2="72.2364"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#66AB28" />
              <stop offset="1" stop-color="#4F891C" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1010_22052"
              x1="58.9463"
              y1="0.633074"
              x2="58.9463"
              y2="23.4264"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#8AE63F" />
              <stop offset="1" stop-color="#77CA33" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <form onSubmit={handleSubmit(signupHandler)}>
        <div className="pt-4 flex flex-col items-center gap-4 self-stretch">
          <div className="flex items-center gap-2 mb-4">
            <label className="w-24 shrink-0 flex items-center">이메일</label>
            <div className="flex flex-grow flex-col">
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
                className="flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <label className="w-24 shrink-0 flex items-center">비밀번호</label>
            <div className="flex flex-grow flex-col">
              <input
                id="password"
                type="password"
                placeholder="8자리 이상 영문, 숫자 포함"
                {...register("password", { required: true })}
                className="flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none"
              />
              {errors.password && (
                <span className="text-red-500">
                  비밀번호 조건에 맞게 입력해주세요
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <label className="w-24 shrink-0">비밀번호 확인</label>
            <div className="flex flex-grow flex-col">
              <input
                id="passwordChecking"
                type="password"
                placeholder="비밀번호 확인"
                {...register("passwordConfirmation", {
                  required: true,
                  validate: (value) => value === passwordRef.current,
                })}
                className="flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none"
              />
              {errors.passwordConfirmation &&
                errors.passwordConfirmation.type === "required" && (
                  <span className="text-red-500">
                    비밀번호 확인을 입력하세요
                  </span>
                )}
              {errors.passwordConfirmation &&
                errors.passwordConfirmation.type === "validate" && (
                  <span className="text-red-500">
                    비밀번호가 일치하지 않습니다
                  </span>
                )}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <label className="w-24 shrink-0 flex items-center">닉네임</label>
            <div className="flex flex-grow flex-col">
              <input
                id="nickname"
                type="nickname"
                placeholder="닉네임 입력"
                {...register("nickname", { required: true, maxLength: 20 })}
                className="flex w-80 h-12 p-4 items-center border rounded-xl bg-gray-50 outline-none"
              />
              {errors.nickname && errors.nickname.type === "required" && (
                <span className="text-red-500">닉네임을 입력해주세요</span>
              )}
              {errors.nickname && errors.nickname.type === "maxLength" && (
                <span className="text-red-500">20자 이내로 작성해주세요</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-[424px] h-12 justify-center items-center border rounded-xl bg-gray-900 text-white hover:bg-gray-700"
          >
            회원가입
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SignUp;
