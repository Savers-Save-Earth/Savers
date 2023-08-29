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

const page = () => {
  const [user, setUser] = useState<any>([]);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

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
  };

  const handleSubmit = async () => {
    console.log(searchId);
    const { error: updateDataError } = await supabase
      .from("user")
      .update({ nickname: name, email, number })
      .eq("nickname", searchId);

    alert("수정이 완료되었습니다.");
  };
  return (
    <form>
      <h1>회원정보 수정</h1>
      <p>
        닉네임 :
        <input
          type="text"
          value={name}
          className="bg-gray-100"
          onChange={(e) => setName(e.target.value)}
        />
      </p>
      <p>
        이메일 :
        <input
          type="text"
          style={{ background: "lightgray", borderRadius: "5px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>
      <p>
        휴대전화 :
        <input
          type="text"
          style={{ background: "lightgray", borderRadius: "5px" }}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </p>
      <button
        onClick={(e) => {
          handleSubmit();
          e.preventDefault();
        }}
      >
        수정완료
      </button>
    </form>
  );
};

export default page;
