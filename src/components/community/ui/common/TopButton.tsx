"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cls } from "@/libs/util";
import { PATHNAME_EDIT, PATHNAME_WRITE } from "@/enums/community";
import { useIsLaptop } from "@/hooks/useIsLaptop";

const TopButton = () => {
  const user = useAuth();
  const pathname = usePathname();
  const isLaptop = useIsLaptop();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {isLaptop || pathname === PATHNAME_WRITE || pathname === PATHNAME_EDIT ? null : (
        <button
          onClick={handleScrollToTop}
          className={cls(
            "fixed right-10 bg-white text-gray-400 rounded-full p-4 shadow-lg hover:bg-melon-400 transition ease-in-out duration-200",
            user ? "bottom-28" : "bottom-10",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default TopButton;
