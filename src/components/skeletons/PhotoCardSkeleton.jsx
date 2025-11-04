import React from 'react';

export function PhotoCardSkeleton() {
  return (
    <div className="relative h-[540px] mx-4 rounded-[28px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
      <div className="absolute inset-0 cb-shimmer" />

      {/* Top dots placeholder */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-10">
        <div className="bg-white/30 rounded-full p-1.5 flex gap-1">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className={`h-1 rounded-full ${idx === 0 ? 'w-8 bg-white/80' : 'w-4 bg-white/50'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoCardSkeleton;
