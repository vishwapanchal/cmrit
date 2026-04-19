/**
 * Skeleton loading components for data delay states.
 * Uses the CSS `.skeleton` class (shimmer animation) from index.css.
 */

export function SkeletonLine({ width = "100%", height = "14px", className = "" }) {
  return <div className={`skeleton ${className}`} style={{ width, height, borderRadius: "6px" }} />;
}

export function SkeletonCard({ className = "" }) {
  return (
    <div className={`card p-5 space-y-3 ${className}`}>
      <SkeletonLine width="40%" height="12px" />
      <SkeletonLine width="60%" height="24px" />
      <SkeletonLine width="80%" height="12px" />
    </div>
  );
}

export function SkeletonStatsRow({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonGauge() {
  return (
    <div className="card p-6 text-center space-y-4">
      <SkeletonLine width="60%" height="10px" className="mx-auto" />
      <div className="skeleton mx-auto" style={{ width: "160px", height: "90px", borderRadius: "80px 80px 0 0" }} />
      <SkeletonLine width="80px" height="22px" className="mx-auto" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="card p-5 space-y-3">
      <SkeletonLine width="30%" height="14px" />
      <div className="skeleton" style={{ width: "100%", height: "200px", borderRadius: "8px" }} />
    </div>
  );
}

export function SkeletonTable({ rows = 4 }) {
  return (
    <div className="table-container">
      <div className="px-4 py-3 bg-surface-alt border-b border-border">
        <SkeletonLine width="120px" height="12px" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-4 py-3 border-b border-border flex gap-6">
          <SkeletonLine width="20%" height="14px" />
          <SkeletonLine width="30%" height="14px" />
          <SkeletonLine width="15%" height="14px" />
          <SkeletonLine width="15%" height="14px" />
        </div>
      ))}
    </div>
  );
}
