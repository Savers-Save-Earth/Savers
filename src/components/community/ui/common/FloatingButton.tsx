"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PATHNAME_EDIT, PATHNAME_WRITE } from "@/enums/community";
import { useAuth } from "@/hooks/useAuth";
import { useIsLaptop } from "@/hooks/useIsLaptop";
import { cls } from "@/libs/util";


const FloatingButton = () => {
  const user = useAuth();
  const isLaptop = useIsLaptop();
  const pathname = usePathname();
  return (
    <>
      {!user ||
      pathname === PATHNAME_WRITE ||
      pathname === PATHNAME_EDIT ? null : (
        <Link href={PATHNAME_WRITE}>
            <button
              className={cls("fixed bg-mainGreen text-white rounded-full p-4 shadow-lg hover:bg-melon-400 transition ease-in-out duration-200",
                isLaptop ? "right-4 bottom-20" : "right-10 bottom-10"
              )}
              aria-label="커뮤니티 새 게시글 작성 페이지 이동 버튼"
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </Link>
      )}
    </>
  );
};

export default FloatingButton;
