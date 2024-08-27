import Link from 'next/link'

interface SplatListProps {
  splats: string[];
}

export default function SplatList({ splats }: SplatListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {splats.map((splat) => (
        <Link href={`/splats/${splat}`} key={splat}>
          <div className="block p-4 border rounded-lg hover:bg-gray-100 transition-colors">
            <h2 className="text-xl font-semibold">{splat}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
