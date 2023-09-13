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

// 해당 물품 조회

export const getThisProduct = async (productId: any): Promise<Product[]> => {
  try {
    const { data: product } = await supabase
      .from("product")
      .select("*")
      .eq("id", productId);
    return product![0];
  } catch (error) {
    throw error;
  }
};
