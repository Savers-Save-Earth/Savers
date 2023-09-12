import { Metadata } from "next";
import Head from "next/head"

interface SEOProps {
  title: string
  description?: string
}

const Seo = (props: SEOProps) => {
  const { title, description } = props;
  return (
    <Head>
      <title>{title} | Savers</title>
      <meta
        name="description"
        content=""
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Savers 세이버스 - 친환경 커뮤니티" />
      <meta property="og:description" content={description || "지구를 위한 작은 실천"} />
      <meta property="og:url" content="https://savers-git-dev-team-climbers.vercel.app/" />
      <meta property="og:locale" content="ko_KR" />
      <meta
        property="og:image"
        content="https://github.com/Savers-Save-Earth/Savers/assets/124491335/10d73d80-e659-44ae-a456-1db32d8aa4b7"
      />
    </Head>
  )
}

export default Seo