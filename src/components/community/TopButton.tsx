import { currentUserType } from "@/hooks/useAuth";
import { cls } from "@/libs/util";
import React from "react";

const TopButton = ({ user }: { user: currentUserType | null; }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button
      onClick={handleScrollToTop}
      className={cls("fixed right-10 bg-white text-gray-400 rounded-full p-4 shadow-lg hover:bg-melon-400 transition ease-in-out duration-200",
        user ? "bottom-28" : "bottom-10"
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
  );
};

export default TopButton;
