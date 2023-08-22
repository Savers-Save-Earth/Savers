import React from "react";
import Product from "@/components/product/Product";
import Header from "@/components/Header";
import Carousel from "@/components/product/Carousel";
const ProductList = () => {
  return (
    <>
      <Header />
      <Carousel />
      <Product />
    </>
  );
};

export default ProductList;
