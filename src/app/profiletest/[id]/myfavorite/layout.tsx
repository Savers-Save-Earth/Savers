import FavoriteTopBar from "./component/FavoriteTopBar";

export default function MycommunityLayout ({
  children,
}: {
  children: React.ReactNode;
}) 
{
  return (
    <div className="w-full">
        <h1>마이favorite 레이아웃</h1>
        <div className="flex gap-10">
        <FavoriteTopBar/>
      </div>
      <section className="border-dashed border-2 border-indigo-600 h-3/4">{children}</section>
    </div>
  );
}