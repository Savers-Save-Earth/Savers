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
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-bold transition-opacity duration-100 ease-in-out"
          style={{
            opacity: Math.max(0, 1 - scrollY / 100),
            display: scrollY > 4500 ? "none" : "block",
          }}
        >
          SAVERS
        </div>

        <div
          className="fixed bottom-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-bold transition-opacity duration-100 ease-in-out blinking-text"
          style={{
            opacity: Math.max(0, 1 - scrollY / 100),
            display: scrollY > 100 ? "none" : "block",
          }}
        >
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
          className="fade-element fixed  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "25%",
            opacity: Math.min(1, Math.max(0, (scrollY - 100) / 1100)),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 1200) / 15,
            )}px))`,
            display: scrollY > 5300 ? "none" : "block",
          }}
        >
          지구를 지키는 것은 우리의 선택입니다.{" "}
          {/* 자연과 가까울수록 병은 멀어지고,
          <br />
          자연과 멀수록 병은 가까워진다. */}
        </div>
        <div
          className="fade-element fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "50%",
            opacity: Math.min(1, Math.max(0, (scrollY - 1600) / 600)),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 2600) / 15,
            )}px))`,
            display: scrollY > 5200 ? "none" : "block",
          }}
        >
          지구는 하나밖에 없는 우리의 유일한 공간입니다.{" "}
          {/* 자연은 결코 배신하지 않는다.
          <br />
          우리 자신을 배신하는 것은 항상 우리들이다. */}
        </div>
        <div
          className="fade-element fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "75%",
            opacity: Math.min(1, Math.max(0, (scrollY - 3000) / 600)),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 3800) / 15,
            )}px))`,
            display: scrollY > 5100 ? "none" : "block",
          }}
        >
          작은 일에서 큰 변화가 시작됩니다.{" "}
          {/* 예술에는 오류가 있을지 모르나,
          <br />
          자연에는 잘못이 없다. */}
        </div>
      </div>
      <div style={{ height: "3700px" }}></div>
    </>
  );
};

export default Intro;
//intro
