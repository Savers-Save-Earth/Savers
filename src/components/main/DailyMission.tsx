"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastInfo } from "@/libs/toastifyAlert";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobileSm } from "@/hooks/useIsMobileSm";

const DailyMission = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const currentUser = useAuth();
  const isMobileSm = useIsMobileSm();

  const missionHandler = () => {
    if (!currentUser) {
      ToastInfo("로그인이 필요한 서비스 입니다.");
      router.push("/login");
    } else {
      router.push(`/profile/${currentUser.uid}/mymission/missiondoing`);
    }
  };

  return (
    <>
      <h1 className="sm:text-2xl sm:mb-6 mb-4  font-semibold inline-block text-lg">
        일일미션
      </h1>

      <span
        className={`text-gray-700 ml-2 text-[14px] relative cursor-pointer${
          isHovered ? "hovered" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="pb-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="inline-block"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.99984 3.33332C6.31794 3.33332 3.33317 6.31809 3.33317 9.99999C3.33317 13.6819 6.31794 16.6667 9.99984 16.6667C13.6817 16.6667 16.6665 13.6819 16.6665 9.99999C16.6665 6.31809 13.6817 3.33332 9.99984 3.33332ZM1.6665 9.99999C1.6665 5.39762 5.39746 1.66666 9.99984 1.66666C14.6022 1.66666 18.3332 5.39762 18.3332 9.99999C18.3332 14.6024 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6024 1.6665 9.99999Z"
              fill="#D0D5DD"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.74984 6.66666C8.74984 5.9763 9.30948 5.41666 9.99984 5.41666H10.0082C10.6985 5.41666 11.2582 5.9763 11.2582 6.66666V6.67499C11.2582 7.36535 10.6985 7.92499 10.0082 7.92499H9.99984C9.30948 7.92499 8.74984 7.36535 8.74984 6.67499V6.66666Z"
              fill="#D0D5DD"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.99984 9.16666C10.4601 9.16666 10.8332 9.53975 10.8332 9.99999V13.3333C10.8332 13.7936 10.4601 14.1667 9.99984 14.1667C9.5396 14.1667 9.1665 13.7936 9.1665 13.3333V9.99999C9.1665 9.53975 9.5396 9.16666 9.99984 9.16666Z"
              fill="#D0D5DD"
            />
          </svg>
        </span>
        {isHovered && (
          <div className="absolute left-1 bottom-3 bg-[#eaf0e5] w-[220px] z-10 rounded-md p-1.5">
            하루마다 주어지는 일일미션을 완료해 나만의 미션 캘린더를 채워보세요!
          </div>
        )}
      </span>

      <div
        onClick={missionHandler}
        className="h-[120px] xl:h-[158px] bg-[#5FD100] flex relative items-center justify-between w-full  rounded-2xl sm:p-8 p-4 mb-16 cursor-pointer"
      >
        {!isMobileSm ? (
          <img
            src="assets/mission/card.png"
            alt="카드 이미지"
            className="absolute right-20 xl:h-full h-[120px] "
          />
        ) : (
          <img
            src="assets/mission/card2.png"
            alt="카드 이미지"
            className="absolute bottom-0 right-5 xl:h-full h-[120px]"
          />
        )}

        <div>
          <span className="text-white sm:text-[20px] text-sm">
            지구를 지키는
          </span>
          <br />
          {!isMobileSm ? (
            <span className="font-semibold text-white text-[20px]">
              일일미션 랜덤 뽑기
            </span>
          ) : (
            <span className="font-semibold text-white text-[17px]">
              일일미션
              <br />
              랜덤 뽑기
            </span>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="inline-block"
          style={{ verticalAlign: "middle" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071Z"
            fill="white"
          />
        </svg>
      </div>
    </>
  );
};

export default DailyMission;
