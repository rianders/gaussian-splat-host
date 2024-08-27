'use client'

import React, { useState, useEffect } from 'react';
import BabylonScene from './BabylonScene';

interface Splat {
  name: string;
  path: string;
}

const SplatViewer: React.FC = () => {
  const [splats, setSplats] = useState<Splat[]>([]);
  const [selectedSplat, setSelectedSplat] = useState<string | null>(null);

  useEffect(() => {
    // Load initial list of splats
    setSplats([
      { name: 'Sample Splat 1', path: '/splats/sample1.splat' },
      { name: 'Sample Splat 2', path: '/splats/sample2.ply' },
      // Add more initial splats as needed
    ]);
    // Set the first splat as the initially selected one
    setSelectedSplat('/splats/sample1.splat');
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newSplat: Splat = {
        name: file.name,
        path: URL.createObjectURL(file)
      };
      setSplats(prevSplats => [...prevSplats, newSplat]);
      setSelectedSplat(newSplat.path);
    }
  };

  const handleSelectSplat = (path: string) => {
    setSelectedSplat(path);
  };

  const handleSplatLoad = (file: File) => {
    console.log("Splat loaded:", file.name);
    // Add any additional logic you want to perform when a splat is loaded
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Splat Viewer</h2>
        <input 
          type="file" 
          accept=".splat,.ply" 
          onChange={handleFileUpload} 
          className="mb-4"
        />
        <ul className="space-y-2">
          {splats.map(splat => (
            <li key={splat.path} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{splat.name}</span>
              <button 
                onClick={() => handleSelectSplat(splat.path)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-2/3">
        {selectedSplat ? (
          <BabylonScene 
            initialSplatPath={selectedSplat} 
            onSplatLoad={handleSplatLoad}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <p className="text-xl text-gray-600">Select a splat to view</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplatViewer;