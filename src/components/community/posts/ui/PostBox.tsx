import Link from "next/link";
import CategoryTag from "@/components/community/ui/CategoryTag";
import { PostType } from "@/types/types";
import { cls, getFirstImage, getImgUrl, removeHtmlTags } from "@/libs/util";

interface PostBoxProps {
  post: PostType;
  width?: string;
  border?: string;
  margin?: string;
}

const PostBox = ({ post, width, border, margin }: PostBoxProps) => {
  return (
    <div
      key={post.post_uid}
      className={cls("flex flex-col justify-between px-4 py-4",
        border ? border : "",
        margin ? margin : "",
      )}
    >
      <div className="flex flex-col space-y-2">
        <CategoryTag>{post.category}</CategoryTag>
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <Link href={`/community/${post.post_uid}`}>
                <h2 className="font-medium text-lg flex items-center space-x-2 cursor-pointer hover:underline my-2">
                  {post.title}
                </h2>
              </Link>
              <Link href={`/community/${post.post_uid}`}>
                <p className="text-gray-500 text-sm cursor-pointer hover:underline text-ellipsis line-clamp-2">
                  {removeHtmlTags(post.content)}
                </p>
              </Link>
            </div>
            {getFirstImage(post.content) ? (
              <div className="flex-shrink-0 w-24 h-24 ml-2 bg-gray-50">
                <img
                  className="flex-shrink-0 w-24 h-24 rounded-md"
                  src={getImgUrl(getFirstImage(post.content))}
                  alt="thumbnail"
                />
              </div>
            ) : null}
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex space-x-2">
              <div className="space-x-1 items-center justify-center flex text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
                <span>{post.number_comments}</span>
              </div>
              <div className="space-x-1 items-center justify-center flex text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                <span>{post.number_likes}</span>
              </div>
            </div>
            <span className="text-sm text-gray-400">
              {post.updated_date.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
