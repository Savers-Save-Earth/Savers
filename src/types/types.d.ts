export interface NewPostType {
  author_uid: string;
  category: string;
  title: string;
  content: string;
}

export interface Product {
  id: string;
  name: string;
  company: string;
  price: number;
  sales: number;
  context: string;
  img: string;
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
}
