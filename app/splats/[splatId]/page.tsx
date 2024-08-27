import { Metadata } from 'next'
import dynamic from 'next/dynamic';

const DynamicBabylonScene = dynamic(() => import('../../components/BabylonScene'), {
  ssr: false,
  loading: () => <p>Loading Babylon Scene...</p>
});

interface PageProps {
  params: { splatId: string }
}

export async function generateStaticParams() {
  // Replace this with your actual list of splat IDs
  const splatIds = ['sample1', 'sample2', 'tokyodrisk'];
  
  return splatIds.map((id) => ({
    splatId: id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Splat Viewer: ${params.splatId}`,
  }
}

export default function SplatPage({ params }: PageProps) {
  const splatUrl = `/splats/${params.splatId}.splat`

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Splat Viewer: {params.splatId}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <DynamicBabylonScene initialSplatPath={splatUrl} />
          </div>
        </div>
      </main>
    </div>
  )
}