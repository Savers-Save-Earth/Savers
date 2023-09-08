"use client";
import FloatingButton from "@/components/community/ui/FloatingButton";
import PopularPosts from "@/components/community/posts/PopularPosts";
import SideBar from "@/components/community/ui/SideBar";
import TopButton from "@/components/community/ui/TopButton";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { PATHNAME_EDIT, PATHNAME_MAIN, PATHNAME_OHJIWAN, PATHNAME_PRODUCT, PATHNAME_RECIPE, PATHNAME_RESTAURANT, PATHNAME_WRITE } from "@/enums/community";

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuth();
  const pathname = usePathname();
  return (
    <div className="flex xl:flex-row flex-col items-start self-stretch xl:mt-28 mt-16">
      {
        pathname === PATHNAME_MAIN
          || pathname === PATHNAME_PRODUCT
          || pathname === PATHNAME_RESTAURANT
          || pathname === PATHNAME_RECIPE
          || pathname === PATHNAME_OHJIWAN
        ?
        <div className="w-full h-full xl:max-w-sm">
          <SideBar />
        </div>
        :
        null
      }
      <main className="w-full xl:min-w-[725px]">
        {
          pathname === PATHNAME_MAIN
            || pathname === PATHNAME_PRODUCT
            || pathname === PATHNAME_RESTAURANT
            || pathname === PATHNAME_RECIPE
            || pathname === PATHNAME_OHJIWAN
          ?
          <PopularPosts />
          :
          null
        }
        {children}
      </main>
      {!user || pathname === PATHNAME_WRITE || pathname === PATHNAME_EDIT
        ? 
        null
        :
        (
          <FloatingButton href={PATHNAME_WRITE}>
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
          </FloatingButton>
        )
      }
      {
        pathname === PATHNAME_WRITE
          || pathname === PATHNAME_EDIT
        ?
        null
        :
        <TopButton user={user} />
      }
    </div>
  );
};

export default CommunityLayout;