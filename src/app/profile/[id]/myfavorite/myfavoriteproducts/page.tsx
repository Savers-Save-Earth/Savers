"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteProducts } from "@/api/profile/fetchFavoriteData";
import NoListToShown from "@/components/profile/NoListShown";

type UserFavoriteProducts = Database["public"]["Tables"]["like_product"]["Row"];

const MyFavoriteProducts = ({ params }: { params: { id: string } }) => {
  const loadBoundaryValue = 12;
  const [userLikedProducts, setUserLikedProducts] = useState<
    UserFavoriteProducts[]
  >([]);
  // const [userId, setUserId] = useState<string | null>(null);
  const [loadCount, setLoadCount] = useState<number>(loadBoundaryValue);
  const [loadMoreBtn, setLoadMoreBtn] = useState<string>("");
  const searchId = params.id

  const { data: favoriteProductsData, isFetching: favoriteProductsFetching } =
    useQuery<any>(["fetchFavoriteProducts", searchId, loadCount], () =>
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
    return <Loading />;
  }

  if (userLikedProducts && userLikedProducts.length < 1) {
    return (
<div className="mx-auto">

  <NoListToShown listProp={"noBookmarkedProduct"} />
</div>
    )
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-start gap-4 self-stretch bg-white mx-auto">
        {userLikedProducts?.map((product) => (
          <div
            className="flex flex-col items-start gap-[6px] cursor-pointer h-[222px]"
            key={product.like_id}
          >
            <img
              className="w-[152px] h-[152px] rounded-2xl shrink-0"
              src={product.img || ""}
              alt="No Image"
            />
            <p className="truncate text-gray-300 text-ellipsis not-italic font-normal leading-[14px]">
              {product.product_company}
            </p>
            <p
              className="truncate text-gray-500 text-ellipsis not-italic font-normal leading-[14px]"
              onClick={() => window.open(`/product/${product.product_uid}`)}
            >
              {product!.product_name!.length > 12
                ? `${product!.product_name!.substring(0, 12)}...`
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

export default MyFavoriteProducts;
