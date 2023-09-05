import GetPosts from '@/components/community/posts/GetPosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "제품 | Savers",
  description: "친환경 제품에 대한 이야기를 나눠보세요.",
};

const CommunityProduct = () => {
  return (
    <GetPosts />
  )
}

export default CommunityProduct