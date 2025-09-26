export function TopTradersSkeleton() {
  return (
     <div className="grid grid-cols-2 gap-2 p-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl p-4 border border-gray-100">
          {/* Profile Image Skeleton */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Name Skeleton */}
          <div className="flex justify-center mb-2">
            <div className="h-4 bg-gray-200 rounded-sm w-full animate-pulse" />
          </div>

        
        

          {/* Button Skeleton */}
          <div className="h-6 bg-gray-200 rounded-xl w-full animate-pulse" />
        </div>
      ))}
    </div>
  );
}
