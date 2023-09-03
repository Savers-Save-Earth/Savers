import supabase from "@/libs/supabase";
import Link from "next/link";
import SideBar from "./components/SideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이 페이지 | Savers",
  description: "Savers 세이버스 - 지구를 위한 작은 실천",
  icons: {
    icon: [
      '/favicon.ico?v=4',
    ],
    apple: [
      'apple-touch-icon.png?v=4',
    ],
    shortcut: [
      'apple-tough-icon.png'
    ]
  },
  manifest: 'stie.webmanifest'
};

export default async function profileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const profiledata = await getProfile(id)
  return (
    <>
      <div className="flex h-full">
      <div className="mt-20 w-[1200px] h-full flex items-start gap-x-8 bg-lightgreen bg-white">
        {/* <div className="sticky top-20 w-[379px] h-full flex flex-col"> */}
        <div className="sticky top-20 w-[339px] min-h-[690px] h-full flex flex-col shadow-xl shadow-black/20 rounded-2xl p-6 border-t-2">
          <SideBar/>
        </div>
        <section className="w-[829px] flex flex-col shrink-0 self-stretch bg-white shadow-xl shadow-black/20 rounded-2xl p-6 border-t-2 cursor-default">
          {children}
        </section>
      </div>
    </div>
    </>
  );
}
