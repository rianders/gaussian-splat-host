'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const SplatList: React.FC = () => {
  const [splats, setSplats] = useState<any[]>([]); // Temporarily using 'any' for debugging

  useEffect(() => {
    fetch('/api/splats')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched splats:', data); // Log fetched data
        const splatData = data.map((path: string) => ({
          name: path.split('/').pop() || path,
          path: path,
        }));
        setSplats(splatData);
      })
      .catch(error => console.error('Error fetching splats:', error)); // Log errors
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Available Splats</h1>
      <ul className="space-y-2">
        {splats.length > 0 ? (
          splats.map((splat: any) => ( // Temporarily using 'any' for debugging
            <li key={splat.path} className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <Link href={`/splats/${splat.name.replace(/\.[^/.]+$/, "")}`}>
                {splat.name}
              </Link>
            </li>
          ))
        ) : (
          <p>No splats found.</p>
        )}
      </ul>
    </div>
  );
};

export default SplatList;
