import React from "react";
import HeaderForMain from "@/components/HeaderForMain";
import Intro from "@/components/main/Intro";
import PostList from "@/components/main/PostList";
import ProductList from "@/components/main/ProductList";
import RestaurantList from "@/components/main/RestaurantList";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <HeaderForMain />
      <Intro />
      <ProductList />
      <RestaurantList />
      <PostList />
      <Link href={"/profile/temporaltestuid"}>Profile</Link>
    </div>
  );
};

export default Home;
