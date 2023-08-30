"use client";

import { cls } from "@/libs/util";
import Link from "next/link";

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

const FloatingButton = ({children, href}: FloatingButtonProps) => {
  return (
    <Link href={href}>
      <button className={cls(
        "fixed right-10 bottom-10 bg-mainGreen text-white rounded-full p-4 shadow-lg hover:bg-melon-400 transition ease-in-out duration-200"
      )}>
        {children}
      </button>
    </Link>
  )
}

export default FloatingButton