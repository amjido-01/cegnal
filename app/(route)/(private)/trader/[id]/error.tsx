'use client';
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="p-6 text-red-500">
      Error loading 🚨
      <button onClick={reset}>Try again</button>
    </div>
  );
}