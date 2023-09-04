"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cls } from "@/libs/util";
import { PATHNAME_MAIN, PATHNAME_OHJIWAN, PATHNAME_PRODUCT, PATHNAME_RECIPE, PATHNAME_RESTAURANT } from "@/enums/community";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className="flex flex-col">
        <div className="flex flex-col space-y-10">
          <h1 className="text-2xl font-semibold">커뮤니티</h1>
            <ul className="flex flex-col space-y-3 text-[20px]">
              <li className={cls(pathname === PATHNAME_MAIN ? "text-mainGreen" : "text-gray-500")}>
                <Link href={PATHNAME_MAIN}>
                  전체
                </Link>
              </li>
              <li className={cls(pathname === PATHNAME_PRODUCT ? "text-mainGreen" : "text-gray-500")}>
                <Link href={PATHNAME_PRODUCT}>
                  제품
                </Link>
              </li>
              <li className={cls(pathname === PATHNAME_RESTAURANT ? "text-mainGreen" : "text-gray-500")}>
                <Link href={PATHNAME_RESTAURANT}>
                  식당
                </Link>
              </li>
              <li className={cls(pathname === PATHNAME_RECIPE ? "text-mainGreen" : "text-gray-500")}>
                <Link href={PATHNAME_RECIPE}>
                  레시피
                </Link>
              </li>
              <li className={cls(pathname === PATHNAME_OHJIWAN ? "text-mainGreen" : "text-gray-500")}>
                <Link href={PATHNAME_OHJIWAN}>
                  오지완
                </Link>
              </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
