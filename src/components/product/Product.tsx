"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Product } from "@/types/types";

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
  { value: "cheap", label: "가격 낮은 순" },
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
      {/* 카테고리 선택 로직 */}
      <div className="flex justify-center items-center mt-10">
        {productCategory.map((category) => (
          <button
            key={category.value}
            onClick={() => setCategory(category.value)}
            className="flex flex-col items-center space-y-2"
          >
            <svg className="text-gray-300 bg-gray-400 w-40 m-2"></svg>
            <p>{category.label}</p>
          </button>
        ))}
      </div>
      {/* 셀렉트바 선택 로직  */}
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <form
        className="rounded-lg flex p-2 items-center gap-2 bg-gray-100"
        style={{ width: "350px", float: "right", marginRight: "22px" }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-100"
          style={{ width: "300px", outline: "none" }}
          placeholder="검색어를 입력하세요."
        />
      </form>
      <div className="mt-5 ">
        {sortedData
          // 검색어 필터 및 카테고리 필터
          .filter(
            (item) =>
              item.name.includes(search.trim()) ||
              item.company.includes(search.trim()),
          )
          .filter((item) => item.category.includes(category))
          .map((item) => (
            <div key={item.id} className="inline-table m-3">
              <img
                src={item.img}
                style={{
                  height: "406px",
                  width: "406px",
                  borderRadius: "16px",
                }}
              />
              <p className="text-gray-500">{item.company}</p>
              <p>{item.name}</p>
              <p>{item.context}</p>
              <p>
                <a href={item.website}>상세보기</a>
              </p>
              {item.sales ? (
                <span className="text-green-500 font-bold mr-2">
                  {item.sales}%
                </span>
              ) : null}
              <span className="font-bold">
                {item.price.toLocaleString("ko-KR")}원
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductComponent;
