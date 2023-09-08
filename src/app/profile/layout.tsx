import supabase from "@/libs/supabase";
import Link from "next/link";
import SideBar from "./components/SideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이 페이지 | Savers",
  description: "Savers 세이버스 - 지구를 위한 작은 실천",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["apple-touch-icon.png?v=4"],
    shortcut: ["apple-tough-icon.png"],
  },
};

export default async function profileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="flex h-full">
      {/* 헤더 높이 및 모양 진행 상황에 따라 mt값 다르게 바꿔줘야 함 */}
      <div className="relative mt-[2rem] xl:mt-[6rem] w-full max-w-[1200px] h-full flex flex-col xl:flex-row xl:items-start gap-y-8 gap-x-8 bg-lightgreen">
        <div className="xl:sticky xl:top-20 w-full xl:w-[30%] xl:h-[70%] flex flex-col justify-center items-center xl:shadow-xl shadow-black/20 rounded-2xl xl:p-6 xl:border-t-2 z-10">
          <SideBar />
        </div>
        <section className="w-full xl:w-[70%] flex flex-col shrink-0 self-stretch bg-white xl:shadow-xl shadow-black/20 rounded-2xl p-6 xl:border-t-2 cursor-default">
          {children}
        </section>
      </div>
    </div>
  </>
    // <>
    //   <div className="flex h-full">
    //     <div className="relative mt-20 w-full max-w-[1200px] h-full flex items-start gap-x-8 bg-lightgreen bg-white">
    //       <div className="sticky top-20 w-[30%] h-[70%] flex flex-col shadow-xl shadow-black/20 rounded-2xl p-6 border-t-2 z-10">
    //         <SideBar />
    //       </div>
    //       <section className="w-[70%] flex flex-col shrink-0 self-stretch bg-white shadow-xl shadow-black/20 rounded-2xl p-6 border-t-2 cursor-default">
    //         {children}
    //       </section>
    //     </div>
    //   </div>
    // </>
  );
}
