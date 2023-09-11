import Seo from '@/components/Seo';
import GetPosts from '@/components/community/posts/GetPosts';
import { Metadata } from 'next';

const CommunityProduct = () => {
  return (
    <>
      <Seo title="제품 | Savers" description="친환경 제품에 대한 이야기를 나눠보세요." />
      <GetPosts />
    </>
  )
}

export default CommunityProduct