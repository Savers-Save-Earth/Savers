const CommentTag = ({ children }: { children: string }) => {
  return (
    <div className="flex flex-col items-start">
      <span className="flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-gray-400 border border-gray-400">
        {children}
      </span>
    </div>
  );
};

export default CommentTag;
