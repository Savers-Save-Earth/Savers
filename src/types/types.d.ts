import { Database } from "./supabase";

export type UserType = Database["public"]["Tables"]["user"]["Row"];

export interface Product {
  id: string;
  name: string;
  company: string;
  price: number;
  sales: number;
  context: string;
  img: string;
  sub_img: string;
  category: string;
  website: string;
  like_count: number;
  createdAt: number;
}

export interface Post {
  post_uid: string;
  category: string;
  author_uid: string;
  title: string;
  content: string;
  created_date: number;
  like_count: number;
  comment_count: number;
  number_comments: number;
  number_likes: number;
}

export interface ListMission {
  id: string;
  missionUid: string;
  createdAt: string;
  userId: string;
  title: string;
  content: string;
  bigCategory: string;
  smallCategory: string;
  doingYn: boolean;
  point: number;
  user_uid: string;
  address: string;
}

// export type ProductType = Database["public"]["Tables"]["product"]["Row"];

// restaurant type

export type ProductLikesType =
  Database["public"]["Tables"]["like_product"]["Row"];
export type ProductType = Database["public"]["Tables"]["product"]["Update"];

export type likeRestaurantType =
  Database["public"]["Tables"]["like_restaurant"]["Row"];

export type PostType = Database["public"]["Tables"]["community"]["Row"];
export type NewPostType = Database["public"]["Tables"]["community"]["Insert"];
export type EditPostType = Database["public"]["Tables"]["community"]["Update"];

export type LikesType = Database["public"]["Tables"]["like_post"]["Row"];
export type newLikePostType =
  Database["public"]["Tables"]["like_post"]["Insert"];

export type CommentType =
  Database["public"]["Tables"]["community_comment"]["Row"];
export type NewCommentType =
  Database["public"]["Tables"]["community_comment"]["Insert"];
export type EditCommentType =
  Database["public"]["Tables"]["community_comment"]["Update"];

export type ReplyType = Database["public"]["Tables"]["community_reply"]["Row"];
export type NewReplyType =
  Database["public"]["Tables"]["community_reply"]["Insert"];
export type EditReplyType =
  Database["public"]["Tables"]["community_reply"]["Update"];
export interface ToTalDataType {
  posts: PostType[];
  page: number;
  total_pages: number;
  total_results: number | null;
}

export interface DetailPostProps {
  postDetail?: PostType;
  postUid: string;
}
export type MissionListType = Database["public"]["Tables"]["missionList"]["Row"];
export type BadgeType = Database["public"]["Tables"]["badge"]["Row"];
export type CommunityComment = Database["public"]["Tables"]["community_comment"]["Row"];

export interface CommunityCommentProps {
  comment: CommunityComment
}

export type LikePost = Database["public"]["Tables"]["like_post"]["Row"];

export interface LikePostProps {
  post: LikePost
}

export interface MyPostProps {
  post: PostType
}

export interface MyBadgeProps {
  badgeData: BadgeType[],
  missionDone: MissionListType[]
}

export type ProfileType = {
  activePoint: number|null
  birthday: string;
  email: string;
  nickname: string;
  number: string;
  profileImage: string;
  provider: string;
  uid: string;
}|null

export interface EditProfileProps {
  profileData: ProfileType[] 
}

export type initialMission = Database["public"]["Tables"]["mission"]["Row"];

export interface initialMissionProps {
  arr: initialMission[]
}


