import LoadingPopularPosts from "@/components/community/ui/LoadingPopularPosts";
import LoadingPosts from "@/components/community/ui/LoadingPosts";

const Loading = () => {
  return (
    <div className="w-full">
      <LoadingPopularPosts />
      <LoadingPosts />
    </div>
  )
}

export default Loading