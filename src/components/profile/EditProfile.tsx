"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";

const EditProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState<string>();
  const [selectedFile, setSelectedFile] = useState();
  const [open, setOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      setUser(user);

      const { data: userData } = await supabase
        .from("user")
        .select()
        .eq("uid", user?.id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fileSelectHandler = (e: any) => {
    const avatarFile = e.target.files[0];
    setSelectedFile(avatarFile);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (!nickname) {
      alert("변경할 닉네임을 입력해주세요.");
      return;
    }

    if (selectedFile) {
      const { data, error } = await supabase.storage
        .from("profileImage")
        .upload(`avarta_${Date.now()}.png`, selectedFile);

      const { error: insertImageError } = await supabase
        .from("user")
        .update({
          nickname,
          profileImage: `https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/${data?.path}`,
        })
        .eq("uid", user?.id);

      alert("수정이 완료되었습니다.");
    }
  };
  const profileEditModalHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <button
        className="text-gray-400 text-[16px] non-italic font-normal leading-4"
        onClick={profileEditModalHandler}
      >
        프로필 수정
      </button>
      <div
        className={`fixed top-0 left-0 bg-black bg-opacity-50 z-30 w-full h-full ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="w-550 h-400 z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
          <form onSubmit={submitHandler} className="text-center">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            사진 :<input type="file" onChange={fileSelectHandler} />
            <button>제출</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
