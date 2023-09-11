import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { newLikePostType } from "@/types/types";
import { Product } from "@/types/types";
import { ProductType } from "@/types/types";
type ProductLikesType = Database["public"]["Tables"]["like_product"]["Row"];
type newProductLikePostType =
  Database["public"]["Tables"]["like_product"]["Insert"];

// 현재 유저의 모든 좋아요 정보를 불러오기
export const getProductLikeStatus = async (
  userId: string,
): Promise<ProductLikesType[]> => {
  const { data: productLikeStatus, error: productLikstStatusError } =
    await supabase.from("like_product").select("*").eq("user_id", userId);

  return productLikeStatus || [];
};

// 현재유저의 해당 물품의 좋아요 정보 불러오기
export const getThisProductLikeStatus = async (
  productId: any,
  userId: string,
) => {
  const { data: thisProductLikeStatus, error: thisProductLikesStatusError } =
    await supabase
      .from("like_product")
      .select("*")
      .eq("user_id", userId)
      .eq("product_uid", productId);

  return thisProductLikeStatus || [];
};

// 좋아요 추가
export const createLikeProduct = async (newLike: newProductLikePostType) => {
  const { error } = await supabase.from("like_product").insert(newLike);
  if (error) return error;
};

// 좋아요 숫자 추가
export const plusLikeCount = async (plusLike: ProductType) => {
  const { data: currentLikeCount } = await supabase
    .from("product")
    .select()
    .eq("id", plusLike.id);

  const { error } = await supabase
    .from("product")
    .update({
      like_count: (plusLike.like_count as number) + 1,
    })
    .eq("id", plusLike.id);
  if (error) return error;
};

// 좋아요 삭제
export const cancelLikeProduct = async (cancelLike: newProductLikePostType) => {
  const { error } = await supabase
    .from("like_product")
    .delete()
    .eq("user_id", cancelLike.user_id)
    .eq("product_uid", cancelLike.product_uid);

  if (error) return error;
};

// 좋아요 숫자 감소
export const minusLikeCount = async (minusLike: ProductType) => {
  const { error } = await supabase
    .from("product")
    .update({
      like_count: (minusLike.like_count as number) - 1,
    })
    .eq("id", minusLike.id);
  if (error) return error;
};

// 좋아요 개수
export const getProductLikesNum = async (productId: string) => {
  const { count } = await supabase
    .from("like_product")
    .select("*", { count: "exact" })
    .eq("product_uid", productId);
  return count;
};
