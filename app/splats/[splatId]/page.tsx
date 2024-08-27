import { Metadata } from 'next'
import dynamic from 'next/dynamic';
import fs from 'fs';
import path from 'path';

const DynamicBabylonScene = dynamic(() => import('../../components/BabylonScene'), {
  ssr: false,
  loading: () => <p>Loading Babylon Scene...</p>
});

interface PageProps {
  params: { splatId: string }
}

export async function generateStaticParams() {
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const files = fs.readdirSync(splatsDirectory);
  
  return files.map((file) => ({
    splatId: path.parse(file).name,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Splat Viewer: ${params.splatId}`,
  }
}

export default function SplatPage({ params }: PageProps) {
  const splatId = params.splatId;
  const splatsDirectory = '/splats';
  let splatUrl = `${splatsDirectory}/${splatId}`;

  // Check if .splat or .ply file exists and set the correct extension
  if (fs.existsSync(path.join(process.cwd(), 'public', `${splatUrl}.splat`))) {
    splatUrl += '.splat';
  } else if (fs.existsSync(path.join(process.cwd(), 'public', `${splatUrl}.ply`))) {
    splatUrl += '.ply';
  } else {
    // Handle case where file doesn't exist
    return <div>Error: Splat file not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Splat Viewer: {splatId}
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