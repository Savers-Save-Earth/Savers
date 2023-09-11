"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useQuery } from "@tanstack/react-query";
import { fetchNicknameData } from "@/api/profile/fetchProfileData";
import { useParams } from "next/navigation";

const EditProfile = ({ profileData }: any) => {
  const [nickname, setNickname] = useState<string>(profileData.nickname || "");
  const [selectedFile, setSelectedFile] = useState();
  const [open, setOpen] = useState(false);
  const [editImage, setEditImage] = useState<string>(
    profileData.profileImage || "",
  );

  const params = useParams();
  const userId = params.id;

  const fileSelectHandler = async (e: any) => {
    const avatarFile = e.target.files && e.target.files[0];
    setSelectedFile(avatarFile);
    const { data, error } = await supabase.storage
      .from("profileImage")
      .upload(`avarta_${Date.now()}.png`, avatarFile);

    if (avatarFile) {
      setEditImage(
        `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/profileImage/${data?.path}`,
      );
    } else {
      setEditImage(
        profileData.profileImage ||
          `https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg`,
      );
    }
  };

  const submitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (nickname.length < 1) {
      alert("변경할 닉네임을 입력해주세요.");
    }

    const isNicknameValid = await fetchNicknameData(nickname, userId as string);

    if (isNicknameValid) {
      console.log(nickname);
      alert("중복된 닉네임 입니다. 다른 닉네임을 입력해주세요.");
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
        .eq("uid", profileData?.uid);

      alert("수정이 완료되었습니다.");
      setOpen(!open);
    } else {
      const { error: insertImageError } = await supabase
        .from("user")
        .update({
          nickname,
        })
        .eq("uid", profileData?.uid);

      alert("수정이 완료되었습니다.");
      setOpen(!open);
    }
    window.location.reload();
  };
  const profileEditModalHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setEditImage(
      profileData.profileImage ||
        `https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg`,
    );
    setOpen(!open);
  };

  return (
    <div>
      <button
        className="text-gray-400 text-[16px] non-italic font-normal leading-4"
        onClick={(e) => profileEditModalHandler(e)}
      >
        프로필 수정
      </button>
      <div
        className={`fixed top-0 left-0 bg-black bg-opacity-50 z-30 w-full h-full ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="w-[400px] h-[400px] sm:w-[480px] sm:h-[468px] z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8">
          <form className="text-center">
            <h1 className="text-xl font-semibold flex">프로필 수정</h1>

            {editImage.length > 0 ? (
              <div className="relative">
                <img
                  src={editImage}
                  alt="기존 프로필이미지"
                  className="w-[140px] h-[140px] rounded-full object-cover mx-auto"
                />
                <label
                  htmlFor="input-file"
                  onClick={(e) => fileSelectHandler(e)}
                  className="absolute bottom-1 right-32"
                >
                  <input
                    type="file"
                    onChange={fileSelectHandler}
                    id="input-file"
                    className="hidden"
                  />
                  <div className="p-[10px] border w-[40px] h-[40px] bg-white border-gray-200 rounded-full cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10 14.5833C11.0417 14.5833 11.9272 14.2186 12.6567 13.4892C13.3861 12.7597 13.7506 11.8744 13.75 10.8333C13.75 9.79167 13.3853 8.90611 12.6559 8.17667C11.9264 7.44722 11.0411 7.08278 10 7.08333C8.95835 7.08333 8.0728 7.44806 7.34335 8.1775C6.61391 8.90694 6.24947 9.79222 6.25002 10.8333C6.25002 11.875 6.61474 12.7606 7.34419 13.49C8.07363 14.2194 8.95891 14.5839 10 14.5833ZM10 12.9167C9.41669 12.9167 8.92363 12.7153 8.52085 12.3125C8.11808 11.9097 7.91669 11.4167 7.91669 10.8333C7.91669 10.25 8.11808 9.75694 8.52085 9.35417C8.92363 8.95139 9.41669 8.75 10 8.75C10.5834 8.75 11.0764 8.95139 11.4792 9.35417C11.882 9.75694 12.0834 10.25 12.0834 10.8333C12.0834 11.4167 11.882 11.9097 11.4792 12.3125C11.0764 12.7153 10.5834 12.9167 10 12.9167ZM3.33335 17.5C2.87502 17.5 2.48252 17.3367 2.15585 17.01C1.82919 16.6833 1.66613 16.2911 1.66669 15.8333V5.83333C1.66669 5.375 1.83002 4.9825 2.15669 4.65583C2.48335 4.32917 2.87558 4.16611 3.33335 4.16667H5.95835L7.50002 2.5H12.5L14.0417 4.16667H16.6667C17.125 4.16667 17.5175 4.33 17.8442 4.65667C18.1709 4.98333 18.3339 5.37556 18.3334 5.83333V15.8333C18.3334 16.2917 18.17 16.6842 17.8434 17.0108C17.5167 17.3375 17.1245 17.5006 16.6667 17.5H3.33335ZM16.6667 15.8333V5.83333H13.2917L11.7709 4.16667H8.22919L6.70835 5.83333H3.33335V15.8333H16.6667Z"
                        fill="#98A2B3"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src="https://etsquekrypszfrqglupe.supabase.co/storage/v1/object/public/profileImage/default_profile_image.svg"
                  alt="프로필 이미지"
                  className="w-[140px] h-[140px] rounded-full object-cover mx-auto"
                />
                <label
                  htmlFor="input-file"
                  onClick={fileSelectHandler}
                  className="absolute bottom-1 right-32"
                >
                  <input
                    type="file"
                    onChange={fileSelectHandler}
                    id="input-file"
                    className="hidden"
                  />
                  <div className="p-[10px] border w-[40px] h-[40px] bg-white border-gray-200 rounded-full cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10 14.5833C11.0417 14.5833 11.9272 14.2186 12.6567 13.4892C13.3861 12.7597 13.7506 11.8744 13.75 10.8333C13.75 9.79167 13.3853 8.90611 12.6559 8.17667C11.9264 7.44722 11.0411 7.08278 10 7.08333C8.95835 7.08333 8.0728 7.44806 7.34335 8.1775C6.61391 8.90694 6.24947 9.79222 6.25002 10.8333C6.25002 11.875 6.61474 12.7606 7.34419 13.49C8.07363 14.2194 8.95891 14.5839 10 14.5833ZM10 12.9167C9.41669 12.9167 8.92363 12.7153 8.52085 12.3125C8.11808 11.9097 7.91669 11.4167 7.91669 10.8333C7.91669 10.25 8.11808 9.75694 8.52085 9.35417C8.92363 8.95139 9.41669 8.75 10 8.75C10.5834 8.75 11.0764 8.95139 11.4792 9.35417C11.882 9.75694 12.0834 10.25 12.0834 10.8333C12.0834 11.4167 11.882 11.9097 11.4792 12.3125C11.0764 12.7153 10.5834 12.9167 10 12.9167ZM3.33335 17.5C2.87502 17.5 2.48252 17.3367 2.15585 17.01C1.82919 16.6833 1.66613 16.2911 1.66669 15.8333V5.83333C1.66669 5.375 1.83002 4.9825 2.15669 4.65583C2.48335 4.32917 2.87558 4.16611 3.33335 4.16667H5.95835L7.50002 2.5H12.5L14.0417 4.16667H16.6667C17.125 4.16667 17.5175 4.33 17.8442 4.65667C18.1709 4.98333 18.3339 5.37556 18.3334 5.83333V15.8333C18.3334 16.2917 18.17 16.6842 17.8434 17.0108C17.5167 17.3375 17.1245 17.5006 16.6667 17.5H3.33335ZM16.6667 15.8333V5.83333H13.2917L11.7709 4.16667H8.22919L6.70835 5.83333H3.33335V15.8333H16.6667Z"
                        fill="#98A2B3"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            )}

            <p className="flex pl-12 text-[14px] text-gray-400 mt-2 mb-3">
              닉네임
            </p>
            <input
              type="text"
              value={nickname}
              placeholder={profileData.nickname + " (최대 14글자)"}
              onChange={(e) => {
                const inputText = e.target.value;
                if (inputText.length <= 14) {
                  setNickname(inputText);
                }
              }}
              className="flex h-[48px] p-4 items-center bg-gray-50 rounded-2xl self-stretch w-[320px] outline-none  justify-center mx-auto mb-8"
            />

            <button
              onClick={profileEditModalHandler}
              className="w-[156px] m-1 h-[48px] bg-gray-100 rounded-2xl"
            >
              취소
            </button>
            <button
              onClick={(e) => submitHandler(e)}
              className="w-[156px] m-1 h-[48px] bg-black rounded-2xl text-white  hover:bg-gray-600"
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
