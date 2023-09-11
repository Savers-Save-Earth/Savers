import { Metadata } from "next";
import FavoriteRestaurantsComp from "./FavoriteRestaurantsComp";

export const metadata: Metadata = {
  title: "북마크 식당 | Savers",
  description: "북마크하신 식당 목록입니다.",
};

const MyFavoriteRestaurants = ({ params: { id } }: { params: { id: string } }) => {
  return (
      <FavoriteRestaurantsComp id = {id} />
  );
};

export default MyFavoriteRestaurants;