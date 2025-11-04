import React from 'react';

export function MatchCardSkeleton({ index = 0 }) {
  return (
    <div className="w-full cb-card rounded-2xl p-4 border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gray-200" />
        </div>
        <div className="flex-1">
          <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-48 bg-gray-200 rounded" />
        </div>
        <div className="text-right">
          <div className="h-3 w-10 bg-gray-200 rounded mb-2 ml-auto" />
          <div className="w-3 h-3 bg-gray-200 rounded-full ml-auto" />
        </div>
      </div>
      <div className="absolute inset-0 cb-shimmer" />
    </div>
  );
}

export default MatchCardSkeleton;
