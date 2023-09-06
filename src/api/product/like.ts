import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

type ProductLikesType = Database["public"]["Tables"]["like_product"]["Row"];
type newProductLikePostType =
  Database["public"]["Tables"]["like_product"]["Insert"];

export const getProductLikeStatus = async (
  userId: string,
): Promise<ProductLikesType[]> => {
  const { data: productLikstStatus, error: productLikstStatusError } =
    await supabase.from("like_product").select("*").eq("user_id", userId);

  return productLikstStatus || [];
};
