import { Metadata } from "next";
import FavoriteProductsComp from "./FavoriteProductsComp";

export const metadata: Metadata = {
  title: "완료한 미션 | Savers",
  description: "완료한 미션을 확인할 수 있습니다.",
};

const MyFavoriteProducts = ({ params: { id } }: { params: { id: string } }) => {
  return (
      <FavoriteProductsComp id = {id} />
  );
};

export default MyFavoriteProducts;