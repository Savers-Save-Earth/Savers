import React from "react";
import Product from "@/components/product/Product";
import Carousel from "@/components/product/Carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "제품 구매 | Savers",
  description: "Savers 세이버스 - 지구를 위한 작은 실천",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["apple-touch-icon.png?v=4"],
    shortcut: ["apple-tough-icon.png"],
  },
};

const ProductList = () => {
  return (
    <>
      <div className="pt-28 items-start self-stretch">
        <Carousel />
        <Product />
      </div>
    </>
  );
};

export default ProductList;
