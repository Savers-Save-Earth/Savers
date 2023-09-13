"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import { UserType } from "@/types/types";
import { ToastError, ToastSuccess } from "@/libs/toastifyAlert";

const ModifyingProfile = () => {
  const [user, setUser] = useState<UserType[]>([]);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [birthday, setBirthday] = useState("");

  const searchId = useParams().id;

  const [numberMessage, setNumberMessage] = useState(" ");
  const [birthdayMessage, setBirthdayMessage] = useState(" ");
  const [numberValid, setNumberValid] = useState(true);
  const [birthdayValid, setBirthdayValid] = useState(true);

  const getUser = async () => {
    const { data } = await supabase.from("user").select().eq("uid", searchId);
    setUser(data!);
    setUserInfo(data!);
  };
  useEffect(() => {
    getUser();
  }, []);
  const setUserInfo = (data: UserType[]) => {
    setName(data[0].nickname);
    setEmail(data[0].email);
    setNumber(data[0].number);
    setBirthday(data[0].birthday);
  };

  const handleSubmit = async () => {
    if (!email) {
      ToastError("이메일은 필수정보입니다! 입력 부탁드려요🌱");
      return;
    }
    if (numberValid === false || birthdayValid === false) {
      // if (emailValid || !numberValid || !birthdayValid) {
      ToastError("입력정보 형식이 잘못되었네요. \n전화번호와 생년월일은 필수기입사항이 아닙니다🌱")
      return;
    }
    const { error: updateDataError } = await supabase
      .from("user")
      .update({ nickname: name, email, number, birthday })
      .eq("uid", searchId);

      ToastSuccess("수정이 완료되었습니다.");
  };

  const HandleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    setStateMessage: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setStateMessage("");
    setState(event.target.value);
  };

  const HandleInputValidation = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    const currentName = event.target.name;
    const currentValue: string = event.target.value;
    switch (currentName) {
      case "number":
        const numberRegExp = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
        if (currentValue === "") {
          setNumberMessage(" ");
          setNumberValid(true);
        } else if (!numberRegExp.test(currentValue)) {
          setNumberMessage(
            "*휴대폰 번호 형식이 올바르지 않습니다! (예: 010-1234-5678)",
          );
          setNumberValid(false);
        } else {
          setNumberMessage("*사용가능한 휴대폰 번호입니다.");
          setNumberValid(true);
        }
        break;

      case "birthday":
        const birthdayRegExp =
          /^(19[0-9]{2}|20[0-2][0-9]|2023)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        if (currentValue === "") {
          setBirthdayMessage(" ");
          setBirthdayValid(true);
        } else if (!birthdayRegExp.test(currentValue)) {
          setBirthdayMessage(
            "*생년월일 형식이 올바르지 않습니다! (예 : 1992-03-12)",
          );
          setBirthdayValid(false);
        } else {
          setBirthdayMessage(" ");
          setBirthdayValid(true);
        }
        break;

      default:
        break;
    }
  };
  return (
    <form className="flex flex-col items-center">
      <div className="flex justify-between w-3/4 mb-4">
        <h1 className="self-start">회원정보 수정</h1>
        <button
          onClick={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
          className="self-end p-1 rounded-lg border-2 border-[#5FD100] hover:bg-[#5FD100] hover:text-white duration-300"
        >
          수정완료
        </button>
      </div>
      <div className="w-3/4">
        <span>이메일</span>
        <input
          type="text"
          className="w-full bg-gray-100 text-gray-400 p-2 rounded-lg outline-none opacity-60 cursor-not-allowed"
          disabled
          value={email}
        />
      </div>
      <div className="w-3/4">
        <span>휴대전화</span>
        <input
          type="text"
          className="w-full bg-gray-100 p-2 rounded-lg outline-none"
          name="number"
          value={number}
          onChange={(e) => HandleInputChange(e, setNumber, setNumberMessage)}
          onBlur={(e) => HandleInputValidation(e)}
        />
        <p className="modifyProfileValidationMessage"> {numberMessage} </p>
      </div>
      <div className="w-3/4">
        <span>생년월일</span>
        <input
          type="text"
          className="w-full bg-gray-100 p-2 rounded-lg outline-none"
          name="birthday"
          value={birthday}
          onChange={(e) =>
            HandleInputChange(e, setBirthday, setBirthdayMessage)
          }
          onBlur={(e) => HandleInputValidation(e)}
        />
        <p className="modifyProfileValidationMessage"> {birthdayMessage} </p>
      </div>
    </form>
  );
};

export default ModifyingProfile;
