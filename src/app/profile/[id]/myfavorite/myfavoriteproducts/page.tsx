import { Metadata } from "next";
import FavoriteProductsComp from "../../../../../components/profile/myfavorite/myfavoriteproducts/FavoriteProductsComp";
import Seo from "@/components/common/Seo";

export const metadata: Metadata = {
  title: "북마크 제품 | Savers",
  description: "북마크하신 제품 목록입니다.",
};

const MyFavoriteProducts = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <Seo
        title="북마크 제품 | Savers"
        description="북마크하신 제품 목록입니다."
      />
      <FavoriteProductsComp id={id} />
    </>
  );
};

export default MyFavoriteProducts;
