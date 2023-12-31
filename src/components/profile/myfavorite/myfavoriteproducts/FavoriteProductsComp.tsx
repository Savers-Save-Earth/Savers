"use client";

import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteProducts } from "@/api/profile/fetchFavoriteData";
import NoListToShown from "@/components/profile/NoListShown";
import LoadingBookmarkedProducts from "@/components/profile/ui/LoadingBookmarkedProducts";
import Image from "next/image";

type UserFavoriteProducts = Database["public"]["Tables"]["like_product"]["Row"];

const FavoriteProductsComp = ({ id }: { id: string }) => {
  const loadBoundaryValue = 12;
  const [userLikedProducts, setUserLikedProducts] = useState<UserFavoriteProducts[]>([]);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const searchId = id;

  const { data: favoriteProductsData, isFetching: favoriteProductsFetching } =
    useQuery(["fetchFavoriteProducts", searchId, loadCount], () =>
      fetchFavoriteProducts(searchId, loadCount),
    );

  useEffect(() => {
    if (!favoriteProductsData) return;
    const count = favoriteProductsData.count;
    const userLikedProducts = favoriteProductsData.favoriteProducts;
    setUserLikedProducts(userLikedProducts);
    if (count && count <= loadBoundaryValue) {
      setLoadMoreBtn("");
      return;
    } else if (count! > loadCount) {
      setLoadMoreBtn("더보기");
      return;
    } else if (count! <= loadCount) {
      if (count! + loadBoundaryValue > loadCount) {
        setLoadMoreBtn("접기");
      } else {
        setLoadCount(loadBoundaryValue);
        setLoadMoreBtn("더보기");
      }
      return;
    }
  }, [favoriteProductsData, loadCount]);

  const handleLoadMore = async () => {
    setLoadCount((prevLoadCount) => prevLoadCount + loadBoundaryValue);
  };

  if (favoriteProductsFetching) {
    return <LoadingBookmarkedProducts />;
  }

  if (userLikedProducts && userLikedProducts.length < 1) {
    return <NoListToShown listProp={"noBookmarkedProduct"} />;
  }
  return (
    <div className="space-y-4 w-full">
      <div className="grid md:grid-cols-4 md:gap-4 sm:grid-cols-3 sm:gap-3 grid-cols-2 gap-2 place-items-center">
        {userLikedProducts?.map((product) => (
          <div
            className="w-full flex flex-col items-center gap-[0.5rem] cursor-pointer h-full"
            key={product.like_id}
          >
            <div className="relative object-contain w-full min-h-[135px] sm:min-h-[168px] h-3/4 rounded-2xl shrink-0 overflow-hidden">
              <Image src={product.img || ""} alt="Product" fill />
            </div>
            <p className="truncate text-gray-300 text-ellipsis not-italic font-normal leading-[14px]">
              {product.product_company}
            </p>
            <p
              className="truncate text-gray-500 text-ellipsis not-italic font-normal leading-[14px]"
              onClick={() => window.open(`/product/${product.product_uid}`)}
            >
              {product!.product_name!.length > 11
                ? `${product!.product_name!.substring(0, 11)}...`
                : product.product_name}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {loadMoreBtn ? (
          <button
            className="py-4 px-5 justify-center items-center gap-[10px] rounded-2xl bg-gray-50"
            onClick={handleLoadMore}
          >
            {loadMoreBtn}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FavoriteProductsComp;
