"use client";
import { cls } from "@/libs/util";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className="flex flex-col">
        <div className="flex flex-col space-y-10">
          <h1 className="text-2xl font-semibold">커뮤니티</h1>
            <ul className="flex flex-col space-y-3 text-[20px]">
              <li className={cls(pathname === "/community" ? "text-mainGreen" : "text-gray-500")}>
                <Link href={"/community"}>
                  전체
                </Link>
              </li>
              <li className={cls(pathname === "/community/product" ? "text-mainGreen" : "text-gray-500")}>
                <Link href={"/community/product"}>
                  제품
                </Link>
              </li>
              <li className={cls(pathname === "/community/restaurant" ? "text-mainGreen" : "text-gray-500")}>
                <Link href={"/community/restaurant"}>
                  식당
                </Link>
              </li>
              <li className={cls(pathname === "/community/recipe" ? "text-mainGreen" : "text-gray-500")}>
                <Link href={"/community/recipe"}>
                  레시피
                </Link>
              </li>
              <li className={cls(pathname === "/community/ohjiwan" ? "text-mainGreen" : "text-gray-500")}>
                <Link href={"/community/ohjiwan"}>
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
