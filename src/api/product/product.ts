import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { Product } from "@/types/types";

// 물품 조회

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data: products } = await supabase.from("product").select("*");
    return products || [];
  } catch (error) {
    throw error;
  }
};
