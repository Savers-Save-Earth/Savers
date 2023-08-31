"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";

interface UserData {
  uid: string;
  nickname: string;
  email: string;
}

const ModifyingProgile = () => {
  const [user, setUser] = useState<any>([]);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [birthday, setBirthday] = useState("");

  const params = useParams();
  const searchId = decodeURIComponent(`${params.id}`);

  const getUser = async () => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("nickname", searchId);

    setUser(data);
    setUserInfo(data);
    console.log(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  const setUserInfo = (data: any) => {
    setName(data[0].nickname);
    setEmail(data[0].email);
    setNumber(data[0].number);
    setBirthday(data[0].birthday);
  };

  const handleSubmit = async () => {
    console.log(searchId);
    const { error: updateDataError } = await supabase
      .from("user")
      .update({ nickname: name, email, number, birthday })
      .eq("nickname", searchId);

    alert("수정이 완료되었습니다.");
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
          className="self-end"
        >
          수정완료
        </button>
      </div>
      <p className="w-3/4">
        <span>닉네임</span>
        <input
          type="text"
          value={name}
          className="w-full bg-gray-100 p-2 rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />
      </p>
      <p className="w-3/4">
        <span>이메일</span>
        <input
          type="text"
          className="w-full bg-gray-100 p-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>
      <p className="w-3/4">
        <span>휴대전화</span>
        <input
          type="text"
          className="w-full bg-gray-100 p-2 rounded-lg"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </p>
      <div className="w-3/4">
        <span>생년월일</span>
        <input
          type="text"
          className="w-full bg-gray-100 p-2 rounded-lg"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="예) 19991212"
        />
      </div>
    </form>
  );
};

export default ModifyingProgile;
