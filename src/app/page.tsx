import React from "react";
import Intro from "@/components/main/Intro";
import PostList from "@/components/main/PostList";
import ProductList from "@/components/main/ProductList";
import RestaurantList from "@/components/main/RestaurantList";

const Home = () => {
  return (
    <div>
      <Intro />
      <ProductList />
      <RestaurantList />
      <PostList />
    </div>
  );
};

export default Home;
