import { getFirstImage, getImgUrl, removeHtmlTags } from "@/libs/util";
import Link from "next/link";
import CategoryTag from "../common/CategoryTag";
import { PostType } from "@/types/types";
import Image from "next/image";

const PopularPostBox = ({ post }: { post: PostType }) => {
  return (
    <Link href={`/community/${post.post_uid}`} key={post.post_uid}>
      <div
        className="max-w-[170px] xl:w-[170px] h-[250px] rounded-md p-3 flex flex-col space-y-2 relative"
        key={post.post_uid}
      >
        {getFirstImage(post.content) ? (
          <div id="include-image">
            <div className="relative flex-shrink-0 w-36 h-36 mx-auto">
              <Image
                src={getImgUrl(getFirstImage(post.content))}
                alt="Thumnail of Popular Post"
                fill={true}
                className="rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="mt-2 text-md text-gray-800 font-semibold leading-5">
              {post.title}
            </h2>
          </div>
        ) : (
          <div id="not-image" className="flex-shrink-0 w-36 h-36 mx-auto">
            <h2 className="mt-2 text-md text-gray-800 font-semibold leading-5">
              {post.title}
            </h2>
            <p className="text-sm text-gray-400 mt-2 text-ellipsis line-clamp-5">
              {removeHtmlTags(post.content)}
            </p>
          </div>
        )}
        <div className="flex flex-col absolute bottom-0">
          <CategoryTag>{post.category}</CategoryTag>
        </div>
      </div>
    </Link>
  );
};

export default PopularPostBox;
