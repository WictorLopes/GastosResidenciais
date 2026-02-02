interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className = "", count = 1 }: SkeletonProps) {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`bg-gray-300 rounded animate-pulse ${className}`}
        />
      ))}
    </>
  );
}

// Componente específico para cards
export function CardSkeleton() {
  return (
    <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
          <div className="h-8 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      </div>
      <div className="pt-4">
        <div className="h-4 w-40 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}