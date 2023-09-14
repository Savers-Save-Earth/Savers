import { Metadata } from "next";
import FavoriteRestaurantsComp from "../../../../../components/profile/myfavorite/myfavoriterestaurants/FavoriteRestaurantsComp";
import Seo from "@/components/Seo";

const MyFavoriteRestaurants = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
    <Seo title="북마크 식당 | Savers" description= "북마크하신 식당 목록입니다."/>
      <FavoriteRestaurantsComp id = {id} />
    </>
  );
};

export default MyFavoriteRestaurants;