/**
 * ============================================================================
 * LifestyleRows Component
 * ============================================================================
 * 
 * Displays lifestyle information in a row-based layout with labels and values.
 * Matches the test UI design with clean, boxed value display.
 * 
 * PROPS:
 * - department: Department/specialty (e.g., "Emergency / ICU")
 * - hospital: Hospital name
 * - shift: Shift pattern
 * - distance: Distance away
 * - loveLanguage: Love language preference
 * - pets: Pet preference
 * - smoking: Smoking status
 * - drinking: Drinking status
 * - spiritual: Spiritual/religious status
 */

import React from 'react';

function LifestyleRow({ label, value }) {
  if (!value) return null;
  
  return (
    <div className="mt-3 flex items-center gap-2.5">
      <div className="w-28 text-sm font-semibold text-gray-700 dark:text-gray-400">
        {label}
      </div>
      <div 
        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      >
        <div className="text-[15px] font-medium text-gray-900 dark:text-gray-100">
          {value}
        </div>
      </div>
    </div>
  );
}

export function LifestyleRows({
  department,
  hospital,
  shift,
  distance,
  loveLanguage,
  pets,
  smoking,
  drinking,
  spiritual
}) {
  return (
    <div className="mt-4">
      <LifestyleRow label="Department" value={department} />
      <LifestyleRow label="Hospital" value={hospital} />
      <LifestyleRow label="Shift" value={shift} />
      <LifestyleRow label="Distance" value={distance} />
      {loveLanguage && <LifestyleRow label="Love Language" value={loveLanguage} />}
      {pets && <LifestyleRow label="Pets" value={pets} />}
      {smoking && <LifestyleRow label="Smoking" value={smoking} />}
      {drinking && <LifestyleRow label="Drinking" value={drinking} />}
      {spiritual && <LifestyleRow label="Spiritual" value={spiritual} />}
    </div>
  );
}

export default LifestyleRows;
