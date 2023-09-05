import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

type ProductLikesType = Database["public"]["Tables"]["like_product"]["Row"];
type newProductLikePostType =
  Database["public"]["Tables"]["like_product"]["Insert"];
