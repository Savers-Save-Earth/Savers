"use client";
import React from "react";
import { useState, useEffect } from "react";
const Intro = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="app-container">
        {/* <div
          className="gradient-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background:
              "radial-gradient(ellipse at center, rgba(254, 252, 252, 0.1) 10%, rgba(20, 20, 20, 0.7) 70%, rgba(20, 20, 20, 1))",
          }}
        ></div> */}
        <div className="background-video">
          <video
            autoPlay={true}
            muted={true}
            loop={true}
            style={{
              left: 0,
              width: "100%",

              height: "100vh",
              position: scrollY < 5300 ? "fixed" : "absolute",
              display: scrollY > 5300 ? "none" : "block",
              top: scrollY < 5300 ? 0 : 5300,
              opacity:
                scrollY > 4800 ? Math.max(0, 1 - (scrollY - 4800) / 500) : 1,
              transition: "opacity 0.3s ease", // Add transition for smooth effect
            }}
            src={require("../../../public/assets/environment6.mp4")}
          />
        </div>
        <div
          className="xl:text-8xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white sm:text-6xl text-5xl  font-bold transition-opacity duration-100 ease-in-out"
          style={{
            opacity: Math.max(0, 1 - scrollY / 100),
            display: scrollY > 4500 ? "none" : "block",
          }}
        >
          SAVERS
        </div>

        <div
          className="fixed bottom-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-bold transition-opacity duration-100 ease-in-out blinking-text cursor-pointer"
          style={{
            opacity: Math.max(0, 1 - scrollY / 100),
            display: scrollY > 100 ? "none" : "block",
          }}
          onClick={() => {
            if (scrollY < 5600) {
              window.scroll({
                top: 5600,
                // behavior: 'smooth', // 부드럽게 스크롤 이동
              });
            }
          }}
        >
          <p className="xl:text-[17px] text-[15px] text-center">SKIP</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.8449 13.8215C32.194 13.1706 31.1387 13.1706 30.4878 13.8215L19.9997 24.3096L9.51152 13.8215C8.86065 13.1706 7.80537 13.1706 7.1545 13.8215C6.50362 14.4724 6.50362 15.5276 7.15449 16.1785L18.8212 27.8452C19.472 28.496 20.5273 28.496 21.1782 27.8452L32.8449 16.1785C33.4957 15.5276 33.4957 14.4724 32.8449 13.8215Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
        <div
          className="sm:text-3xl text-lg fade-element fixed  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white xl:text-4xl font-bold transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "25%",
            opacity: Math.min(1, Math.max(0, (scrollY - 100) / 1100)),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 1200) / 15,
            )}px))`,
            display: scrollY > 5300 ? "none" : "block",
            whiteSpace: "nowrap", // 텍스트 줄 바꿈 비활성화
            maxWidth: "100%", // 텍스트의 최대 너비를 100%로 설정
          }}
        >
          지구를 지키는 것은 우리의 선택입니다.
        </div>
        <div
          className="sm:text-3xl text-lg fade-element fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white xl:text-4xl font-bold transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "50%",
            opacity: Math.min(1, Math.max(0, (scrollY - 1600) / 600)),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 2600) / 15,
            )}px))`,
            display: scrollY > 5200 ? "none" : "block",
            whiteSpace: "nowrap", // 텍스트 줄 바꿈 비활성화
            maxWidth: "100%", // 텍스트의 최대 너비를 100%로 설정
          }}
        >
          지구는 하나밖에 없는 우리의 공간입니다.
        </div>
        <div
          className="sm:text-3xl text-lg  fade-element fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:text-4xl font-bold text-white transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "75%",
            opacity: Math.min(1, Math.max(0, (scrollY - 3000) / 600)),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 3800) / 15,
            )}px))`,
            display: scrollY > 5100 ? "none" : "block",
            whiteSpace: "nowrap", // 텍스트 줄 바꿈 비활성화
            maxWidth: "100%", // 텍스트의 최대 너비를 100%로 설정
          }}
        >
          작은 일에서 큰 변화가 시작됩니다.
        </div>
      </div>
      <div style={{ height: "3700px" }}></div>
    </>
  );
};

export default Intro;
//intro
