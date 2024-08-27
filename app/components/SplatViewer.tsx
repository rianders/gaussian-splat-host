'use client'

import React, { useState, useEffect } from 'react';
import BabylonScene from './BabylonScene';

const SplatViewer: React.FC = () => {
  const [splats, setSplats] = useState<string[]>([]);
  const [selectedSplat, setSelectedSplat] = useState<string | null>(null);

  useEffect(() => {
    // Fetch splats from the API
    fetch('/api/splats')
      .then(response => response.json())
      .then(data => {
        setSplats(data);
        setSelectedSplat(data[0]); // Set the first splat as the selected one
      })
      .catch(error => console.error('Error fetching splats:', error));
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newSplatPath = URL.createObjectURL(file);
      setSplats(prevSplats => [...prevSplats, newSplatPath]);
      setSelectedSplat(newSplatPath);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Splat Viewer</h2>
        <input 
          type="file" 
          accept=".splat,.ply" 
          onChange={handleFileUpload} 
          className="mb-4 border border-gray-300 rounded p-2 bg-white dark:bg-gray-800 dark:text-white"
        />
        <ul className="space-y-2">
          {splats.map(splat => (
            <li 
              key={splat} 
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
            >
              <span>{splat.split('/').pop()}</span>
              <button 
                onClick={() => setSelectedSplat(splat)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-2/3 flex items-center justify-center">
        {selectedSplat ? (
          <BabylonScene initialSplatPath={selectedSplat} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700 rounded-lg">
            <p className="text-xl text-gray-600 dark:text-gray-300">Select a splat to view</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplatViewer;
