import Link from 'next/link'

interface SplatListProps {
  splats: Array<{
    name: string;
    type: 'splat' | 'ply';
  }>;
}

export default function SplatList({ splats }: SplatListProps) {
  const filteredSplats = splats.filter(splat => splat.name !== 'starter');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
      {filteredSplats.map((splat) => (
        <Link href={`/splats/${splat.name}`} key={splat.name}>
          <div className="block p-4 border rounded-lg hover:bg-gray-100 transition-colors" role="listitem">
            <h2 className="text-xl font-semibold">{splat.name}</h2>
            <p className="text-sm text-gray-600">Type: {splat.type}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}