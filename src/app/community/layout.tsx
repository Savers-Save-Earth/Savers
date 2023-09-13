import FloatingButton from "@/components/community/ui/common/FloatingButton";
import PopularPosts from "@/components/community/posts/PopularPosts";
import SideBar from "@/components/community/ui/common/SideBar";
import TopButton from "@/components/community/ui/common/TopButton";
import Seo from "@/components/Seo";

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex xl:flex-row flex-col items-start self-stretch xl:mt-28 mt-16">
      <SideBar />
      <main className="w-full xl:min-w-[725px]">
        <PopularPosts />
        {children}
      </main>
      <FloatingButton />
      <TopButton />
    </div>
  );
};

export default CommunityLayout;