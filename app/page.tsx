import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SplatList from './components/SplatList';
import Link from 'next/link';

const DynamicBabylonScene = dynamic(() => import('./components/BabylonScene'), {
  ssr: false,
  loading: () => <p>Loading 3D viewer...</p>
});

export default function Home() {
  const [splats, setSplats] = useState<Array<{ name: string; type: 'splat' | 'ply' }>>([]);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the list of splats
    setSplats([
      { name: 'starter', type: 'splat' },
      { name: 'example1', type: 'splat' },
      { name: 'example2', type: 'ply' },
      // Add more splats as needed
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gaussian Splat Host
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold mb-4">Featured Splat</h2>
            <div className="mb-8">
              <Link href="/splats/starter" className="block border rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <DynamicBabylonScene splatUrl="/starter.splat" />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold">Starter Splat</h3>
                  <p className="text-sm text-gray-600">Click to view in full screen</p>
                </div>
              </Link>
            </div>
            <h2 className="text-2xl font-semibold mb-4">All Splats</h2>
            <SplatList splats={splats} />
          </div>
        </div>
      </main>
    </div>
  )
}