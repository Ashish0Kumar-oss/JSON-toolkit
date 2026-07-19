import React from 'react';

export function SimplePage({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full bg-[#0A0A0A]">
      <h1 className="text-3xl font-bold mb-8 text-white">{title}</h1>
      <div className="prose prose-invert max-w-none text-gray-300">
        {children}
      </div>
    </div>
  );
}
