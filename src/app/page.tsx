import React from "react";
import Intro from "@/components/main/Intro";
import PostList from "@/components/main/PostList";
import ProductList from "@/components/main/ProductList";
import RestaurantList from "@/components/main/RestaurantList";
import DailyMission from "@/components/main/DailyMission";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
      <Intro />
      <DailyMission />
      <ProductList />
      <RestaurantList />
      <PostList />
      <Footer />
    </div>
  );
};

export default Home;
