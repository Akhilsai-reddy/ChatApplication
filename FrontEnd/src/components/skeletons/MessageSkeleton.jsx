const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-pulse">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className={`chat-image avatar flex items-start ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
            <div className="w-10 h-10 rounded-full bg-gray-300"></div> {/* Profile Skeleton */}
          </div>

          <div className={`chat-bubble  p-2 rounded-lg max-w-xs`}>
            <div className="skeleton h-4 w-32 mb-2 bg-gray-300"></div> {/* Message Header Skeleton */}
            <div className="skeleton h-16 w-40 bg-gray-300"></div> {/* Message Body Skeleton */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
