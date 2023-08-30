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

export interface ToTalDataType {
  posts: PostType[];
  page: number;
  total_pages: number;
  total_results: number | null;
}