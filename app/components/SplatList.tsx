import React from 'react';
import Link from 'next/link';

interface SplatListProps {
  splats: string[];
}

const SplatList: React.FC<SplatListProps> = ({ splats }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Available Splats</h1>
      <ul className="space-y-2">
        {splats.length > 0 ? (
          splats.map((splat) => (
            <li key={splat} className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
              <Link href={`/splats/${splat.replace(/\.[^/.]+$/, '')}`}>
                <a className="text-blue-500 hover:underline">{splat}</a>
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
