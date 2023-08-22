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
  website: string;
  liked_num: number;
  createdAt: number;
}

const productCategory = [
  { value: "", label: "전체" },
  { value: "bath", label: "욕실" },
  { value: "kitchen", label: "주방" },
  { value: "food", label: "식품" },
  { value: "else", label: "기타" },
];

const selectOptions = [
  { value: "newest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "cheap", label: "가격 적은 순" },
  { value: "expensive", label: "가격 높은 순" },
  { value: "sales", label: "할인순" },
];

const ProductComponent = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("newest");

  const fetchProduct = async () => {
    try {
      const { data } = await supabase.from("product").select();
      console.log(data);
      setProduct(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // 셀렉트 내용으로 정렬
  let sortedData = product.slice(); // 초기화

  if (select === "expensive") {
    sortedData = product.slice().sort((a, b) => b.price - a.price);
  } else if (select === "cheap") {
    sortedData = product.slice().sort((a, b) => a.price - b.price);
  } else if (select === "sales") {
    sortedData = product.slice().sort((a, b) => b.sales - a.sales);
  } else if (select === "newest") {
    sortedData = product.slice().sort((a, b) => b.createdAt - a.createdAt);
  }

  return (
    <>
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
        {sortedData
          // 검색어 필터 및 카테고리 필터
          .filter(
            (item) =>
              item.name.includes(search.trim()) ||
              item.company.includes(search.trim()),
          )
          .filter((item) => item.category.includes(category))
          .map((item) => (
            <div key={item.id} className="inline-table">
              <img src={item.img} style={{ height: "300px" }} />
              <p>{item.company}</p>
              <p>{item.name}</p>
              <p>{item.context}</p>
              <a href={item.website}>상세보기</a>
              {item.sales ? <p>{item.sales}%</p> : null}
              <p>{item.price.toLocaleString("ko-KR")}원</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductComponent;
