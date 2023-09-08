import FavoriteTopBar from "./component/FavoriteTopBar";

export default function MyfavoriteLayout ({
  children,
}: {
  children: React.ReactNode;
}) 
{
  return (
    <div className="w-full flex flex-col items-start gap-6 shrink-0 self-stretch rounded-2xl">
    <h1 className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">좋아요</h1>
        <div className="flex gap-10">
        <FavoriteTopBar/>
      </div>
      <section className="w-full">{children}</section>
      </div>
  );
}