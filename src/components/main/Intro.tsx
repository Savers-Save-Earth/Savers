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
          className="fade-element background-image"
          style={{
            position: scrollY < 5000 ? "fixed" : "absolute",
            top: scrollY < 5000 ? 0 : 5000,
            opacity:
              scrollY > 3000 ? Math.max(0, 1 - (scrollY - 3000) / 500) : 1,
            transition: "opacity 0.3s ease", // Add transition for smooth effect
          }}
        />

        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-bold transition-opacity duration-100 ease-in-out"
          style={{ opacity: Math.max(0, 1 - scrollY / 100) }}
        >
          SAVERS
        </div>

        <div
          className="fade-element fixed  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "calc(25% - 30px)",
            opacity: Math.min(1, scrollY / 1000),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 1000) / 15,
            )}px))`,
          }}
        >
          "자연과 가까울수록 병은 멀어지고,
          <br />
          자연과 멀수록 병은 가까워진다."
        </div>
        <div
          className="fade-element fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "calc(50% - 20px)",
            opacity: Math.min(1, scrollY / 2000),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 2000) / 15,
            )}px))`,
          }}
        >
          "자연은 결코 배신하지 않는다.
          <br />
          우리 자신을 배신하는 것은 항상 우리들이다."
        </div>
        <div
          className="fade-element fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white transition-opacity duration-100 ease-in-out"
          style={{
            textAlign: "center",
            top: "calc(75% - 20px)",
            opacity: Math.min(1, scrollY / 3000),
            transform: `translate(-50%, calc(-50% - ${Math.min(
              20,
              (scrollY - 3000) / 15,
            )}px))`,
          }}
        >
          "예술에는 오류가 있을지 모르나,
          <br />
          자연에는 잘못이 없다."
        </div>
      </div>
      <div style={{ height: "3000px" }}></div>
    </>
  );
};

export default Intro;
