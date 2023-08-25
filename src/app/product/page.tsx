import React from "react";
import Product from "@/components/product/Product";
// import Header from "@/components/Header";
import Carousel from "@/components/product/Carousel";
const ProductList = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="p-24 items-start gap-16 self-stretch">
        <h1 className="text-2xl pb-6">친환경제품 구매</h1>
        <Carousel />
        <Product />
      </div>
    </>
  );
};

export default ProductList;
