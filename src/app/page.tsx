import React from "react";
import HeaderForMain from "@/components/HeaderForMain";
import Intro from "@/components/main/Intro";
import PostList from "@/components/main/PostList";
import ProductList from "@/components/main/ProductList";
import RestaurantList from "@/components/main/RestaurantList";

const Home = () => {
  return (
    <div>
      <HeaderForMain />
      <Intro />
      <ProductList />
      <RestaurantList />
      <PostList />
    </div>
  );
};

export default Home;
