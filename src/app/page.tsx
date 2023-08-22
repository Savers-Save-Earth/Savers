import React from "react";
import Intro from "@/components/main/Intro";
import Header from "@/components/Header";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Header />
      <Intro />
      <Link href={"/profile/temporaltestuid"}>Profile</Link>
    </div>
  );
};

export default Home;
