export default function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 skeleton rounded w-3/4"></div>
          <div className="h-3 skeleton rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
