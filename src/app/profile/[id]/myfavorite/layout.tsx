import FavoriteTopBar from "./component/FavoriteTopBar";

export default function MycommunityLayout ({
  children,
}: {
  children: React.ReactNode;
}) 
{
  return (
    <div className="w-full h-full space-y-6">
    <h1 className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">좋아요</h1>
        <div className="flex gap-10">
        <FavoriteTopBar/>
      </div>
      <section>{children}</section>
      </div>
  );
}