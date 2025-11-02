import React from 'react';
import ActionTray from './ActionTray';

// Small visual playground to compare two ActionTray variants side-by-side.
// Usage: import and render <ActionTrayPreview /> inside your app (e.g., temporarily in CodeBlueDating.jsx)

export default function ActionTrayPreview() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-lg font-bold">Action Tray Preview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-2xl cb-shadow-card">
          <h3 className="font-semibold mb-4">Dark Floating Tray (recommended)</h3>
          <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
            {/* Place an ActionTray with variant 'floating' inside a mock card */}
            <ActionTray
              variant="floating"
              onReject={() => console.log('reject (dark preview)')}
              onStar={() => console.log('star (dark preview)')}
              onAccept={() => console.log('accept (dark preview)')}
              className=""
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">Dark tray uses a deep navy capsule with layered shadows; it's elevated and reads as a floating control above the profile card.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl cb-shadow-card">
          <h3 className="font-semibold mb-4">White Pill Tray (contrast-first)</h3>
          <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
            {/* Render the default 'center' variant but wrap to look like white pill */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6">
              <div className="mx-auto max-w-[260px] bg-white/100 rounded-2xl px-3 py-2 shadow-2xl flex items-center justify-between gap-4">
                <ActionTray
                  variant="center"
                  onReject={() => console.log('reject (white preview)')}
                  onStar={() => console.log('star (white preview)')}
                  onAccept={() => console.log('accept (white preview)')}
                  visible={true}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">White pill emphasizes high contrast on top of photos but visually reads as attached to the card; good for accessibility on busy backgrounds.</p>
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        Tip: Render this component inside the Discover view to preview in-context. Example (temporary):
        <div className="bg-white p-3 rounded mt-2">
          <code>import ActionTrayPreview from './components/ActionTrayPreview';</code>
          <br />
          <code>{"<ActionTrayPreview />"}</code>
        </div>
      </div>
    </div>
  );
}
