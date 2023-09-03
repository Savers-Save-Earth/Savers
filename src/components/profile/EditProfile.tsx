"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";

const EditProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState<string>();
  const [selectedFile, setSelectedFile] = useState();
  const [open, setOpen] = useState(false);
  const [editImage, setEditImage] = useState<string>("");
  const [editNickname, setEditNickname] = useState("");

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

      const userDataTable = userData ? userData[0] : null; // 배열의 첫 번째 요소 또는 null로 설정

      if (userDataTable) {
        setEditImage(userDataTable.profileImage);
        setEditNickname(userDataTable.nickname);
      }
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
          profileImage: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/profileImage/${data?.path}`,
        })
        .eq("uid", user?.id);

      alert("수정이 완료되었습니다.");
      setOpen(!open);
      window.location.reload();
    }
  };
  const profileEditModalHandler = (e: any) => {
    e.preventDefault();
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
        <div className="w-[480px] h-[468px] z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8">
          <form className="text-center">
            <h1 className="text-xl font-semibold flex">프로필 수정</h1>

            {editImage ? (
              <img
                src={editImage}
                alt="기존 프로필이미지"
                className="w-[140px] h-[140px] rounded-full object-cover mx-auto"
              />
            ) : (
              <img
                src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg"
                alt="프로필 이미지"
                className="w-[140px] h-[140px] rounded-full object-cover mx-auto"
              />
            )}
            <label htmlFor="input-file">
              <input type="file" onChange={fileSelectHandler} />
            </label>

            <p className="flex pl-12 text-[14px] text-gray-400 mt-2 mb-3">
              닉네임
            </p>
            <input
              type="text"
              value={nickname}
              placeholder={editNickname}
              onChange={(e) => setNickname(e.target.value)}
              className="flex h-[48px] p-4 items-center bg-gray-50 rounded-2xl self-stretch w-[320px] outline-none  justify-center mx-auto mb-8"
            />
            <button
              onClick={profileEditModalHandler}
              className="w-[156px] h-[48px] bg-gray-100 rounded-2xl "
            >
              취소
            </button>
            <button
              onClick={submitHandler}
              className="w-[156px] h-[48px] bg-black rounded-2xl text-white"
            >
              제출
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
