'use client'

import React from 'react';
import dynamic from 'next/dynamic';

const DynamicSplatViewer = dynamic(() => import('./components/SplatViewer'), {
  ssr: false,
  loading: () => <p>Loading Splat Viewer...</p>
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gaussian Splat Viewer
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <DynamicSplatViewer />
          </div>
        </div>
      </main>
    </div>
  )
}