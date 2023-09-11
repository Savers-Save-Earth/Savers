import Detail from "@/components/product/Detail";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "제품 상세 | Savers",
  description: "Savers 세이버스 - 지구를 위한 작은 실천",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["apple-touch-icon.png?v=4"],
    shortcut: ["apple-tough-icon.png"],
  },
};

const ProductPost = () => {
  return <Detail />;
};

export default ProductPost;
