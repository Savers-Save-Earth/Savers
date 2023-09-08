import supabase from "@/libs/supabase";
import Link from "next/link";
import SideBar from "./components/SideBar";
import { Metadata } from "next";
import Footer from "@/components/Footer";

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
        <div className="relative mt-20 w-full max-w-[1200px] h-full flex items-start gap-x-8 bg-lightgreen bg-white">
          <div className="sticky top-20 w-[30%] h-[70%] flex flex-col shadow-xl shadow-black/20 rounded-2xl p-6 border-t-2 z-10">
            <SideBar />
          </div>
          <section className="w-[70%] flex flex-col shrink-0 self-stretch bg-white shadow-xl shadow-black/20 rounded-2xl p-6 border-t-2 cursor-default">
            {children}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
