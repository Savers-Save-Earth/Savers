"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import Header from "../Header";

interface Product {
  id: string;
  name: string;
  company: string;
  price: number;
  sales: number;
  context: string;
  liked: any;
  img: string;
  category: string;
}

const ProductComponent = () => {
  const [product, setProduct] = useState<Product[]>([]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase.from("product").select();
      console.log(data);
      setProduct(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Header />
      <div>
        {product.map((item) => (
          <div key={item.id}>
            <img src={item.img} style={{ width: "300px" }} />
            <p>{item.company}</p>
            <p>{item.name}</p>
            <p>{item.context}</p>
            <p>{item.sales}%</p>
            <p>{item.price.toLocaleString("ko-KR")}원</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductComponent;
