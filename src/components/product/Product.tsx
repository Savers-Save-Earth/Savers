"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";

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
  webstie: string;
}

const productCategory = [
  { value: "", label: "전체" },
  { value: "bath", label: "욕실" },
  { value: "kitchen", label: "주방" },
  { value: "food", label: "식품" },
  { value: "else", label: "기타" },
];

const ProductComponent = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

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
      {productCategory.map((category) => (
        <button
          style={{ width: "50px", background: "lightgray", margin: "10px" }}
          onClick={() => setCategory(category.value)}
        >
          {category.label}
        </button>
      ))}
      <form>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "200px", border: "1px solid gray" }}
        />
      </form>
      <div>
        {product
          // 검색어 필터 및 카테고리 필터
          .filter(
            (item) =>
              item.name.includes(search.trim()) ||
              item.company.includes(search.trim()),
          )
          .filter((item) => item.category.includes(category))
          .map((item) => (
            <div key={item.id}>
              <img src={item.img} style={{ width: "300px" }} />
              <p>{item.company}</p>
              <p>{item.name}</p>
              <p>{item.context}</p>
              {item.sales ? <p>{item.sales}%</p> : null}
              <p>{item.price.toLocaleString("ko-KR")}원</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductComponent;
