const CategoryTag = ({ children }: { children: string }) => {
  return (
    <div className="flex flex-col items-start">
      <span className="flex items-start px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-400">
        {children}
      </span>
    </div>
  );
};

export default CategoryTag;
