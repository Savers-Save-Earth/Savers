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
        <div
          className="background-image"
          style={{
            position: scrollY < 2500 ? "fixed" : "absolute",
            top: scrollY < 2500 ? 0 : 2500,
            opacity:
              scrollY > 300 ? Math.max(0, 1 - (scrollY - 300) / 2000) : 1,
          }}
        />

        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-bold transition-opacity duration-100 ease-in-out"
          style={{ opacity: Math.max(0, 1 - scrollY / 100) }}
        >
          SAVERS
        </div>

        <div
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold transition-opacity duration-100 ease-in-out"
          style={{ opacity: Math.min(1, scrollY / 300) }}
        >
          내가 사는 친환경 제품이,
        </div>
        <div
          className="absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold transition-opacity duration-100 ease-in-out"
          style={{ opacity: Math.min(1, scrollY / 500) }}
        >
          내가 먹는 한끼의 채식이,
        </div>
        <div
          className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white transition-opacity duration-300 ease"
          style={{ opacity: Math.min(1, scrollY / 1100) }}
        >
          지구를 행복하게 합니다.
        </div>
        <div
          className="text-container4"
          style={{ opacity: Math.min(1, scrollY / 1500) }}
        >
          지금, SAVERS 와 함께하세요.
        </div>
      </div>
      <div style={{ height: "5000px" }}></div>
    </>
  );
};

export default Intro;
