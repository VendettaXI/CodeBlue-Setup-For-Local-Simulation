import React from 'react';

export function PromptCardSkeleton({ index = 0 }) {
  return (
    <div
      className="cb-card rounded-2xl p-6 border border-gray-100 overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="h-3 w-40 bg-gray-200 rounded mb-4" />
      <div className="space-y-2 mb-5">
        <div className="h-3 bg-gray-200 rounded w-11/12" />
        <div className="h-3 bg-gray-200 rounded w-10/12" />
        <div className="h-3 bg-gray-200 rounded w-8/12" />
      </div>
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div className="h-3 w-10 bg-gray-200 rounded" />
        <div className="w-8 h-8 rounded-full bg-gray-200 ml-2" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
      <div className="absolute inset-0 cb-shimmer" />
    </div>
  );
}

export default PromptCardSkeleton;
