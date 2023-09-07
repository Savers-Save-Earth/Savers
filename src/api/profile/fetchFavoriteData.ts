import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

export const fetchFavoriteProducts = async (
  searchId: string,
  loadCount: number,
) => {
  try {
    const { data: favoriteProducts, count } = await supabase
      .from("like_product")
      .select("*", { count: "exact" })
      .eq("user_id", searchId)
      .range(0, loadCount - 1);

    if (!favoriteProducts) {
      return {
        favoriteProducts: [],
        count: 0,
      };
    }
    return {
      favoriteProducts,
      count,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchFavoriteRestaurants = async (
  searchId: string,
  loadCount: number,
) => {
  try {
    const { data: favoriteRestaurants, count } = await supabase
      .from("like_restaurant")
      .select("*", { count: "exact" })
      .eq("user_id", searchId)
      .range(0, loadCount - 1);

    if (!favoriteRestaurants) {
      return {
        favoriteRestaurants: [],
        count: 0,
      };
    }
    return {
      favoriteRestaurants,
      count,
    };
  } catch (error) {
    throw error;
  }
};
