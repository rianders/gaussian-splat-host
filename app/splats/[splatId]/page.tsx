'use client'

import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const DynamicBabylonScene = dynamic(() => import('../../components/BabylonScene'), {
  ssr: false,
  loading: () => <p>Loading 3D viewer...</p>
});

export default function SplatPage() {
  const params = useParams()
  const splatId = params.splatId as string

  const fileExtension = splatId.endsWith('.ply') ? '.ply' : '.splat'
  const splatUrl = `/splats/${splatId}${fileExtension}`

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Splat Viewer: {splatId}
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to List
          </Link>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <DynamicBabylonScene splatUrl={splatUrl} />
          </div>
        </div>
      </main>
    </div>
  )
}