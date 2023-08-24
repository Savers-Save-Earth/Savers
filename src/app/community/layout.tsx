import NavBar from "@/components/community/NavBar";

const CommunityLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <section>
      <NavBar />
      {children}
    </section>
  );
};

export default CommunityLayout;