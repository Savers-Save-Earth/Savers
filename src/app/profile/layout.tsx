import ProfileSideBar from "@/components/profile/ProfileSideBar";
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
}
) {
  
  return (
      <div className="flex h-full">
        <div className="relative mt-5 xl:mt-[6rem] w-full max-w-[1200px] h-full flex flex-col xl:flex-row xl:items-start gap-y-8 gap-x-8 bg-lightgreen">
          <div className="xl:sticky xl:top-20 w-full xl:w-[30%] xl:h-[70%] xl:min-h-[508px] flex flex-col justify-center items-center xl:shadow-xl shadow-black/20 rounded-2xl xl:p-6 xl:border-t-2 z-10">
            <ProfileSideBar />
          </div>
          <section className="w-full xl:w-[70%] flex flex-col shrink-0 self-stretch bg-white xl:shadow-xl shadow-black/20 rounded-2xl p-6 sm:p-12 xl:border-t-2 cursor-default">
            {children}
          </section>
        </div>
      </div>
  );
}
