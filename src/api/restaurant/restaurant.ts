import supabase from "@/libs/supabase";
import { Product } from "@/types/types";
import { Database } from "@/types/supabase";

type likeRestaurantType =
  Database["public"]["Tables"]["like_restaurant"]["Row"];

// 레스토랑 조회

export const getRestaurants = async (): Promise<likeRestaurantType[]> => {
  try {
    const { data: restaurants } = await supabase
      .from("like_restaurant")
      .select("*");
    return restaurants || [];
  } catch (error) {
    throw error;
  }
};
