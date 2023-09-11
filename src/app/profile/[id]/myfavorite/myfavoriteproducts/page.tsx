import { Metadata } from "next";
import FavoriteProductsComp from "./FavoriteProductsComp";

export const metadata: Metadata = {
  title: "북마크 제품 | Savers",
  description: "북마크하신 제품 목록입니다.",
};

const MyFavoriteProducts = ({ params: { id } }: { params: { id: string } }) => {
  return (
      <FavoriteProductsComp id = {id} />
  );
};

export default MyFavoriteProducts;