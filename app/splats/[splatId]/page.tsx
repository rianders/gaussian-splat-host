import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import fs from 'fs';
import path from 'path';

const DynamicBabylonScene = dynamic(() => import('../../components/BabylonScene'), {
  ssr: false,
  loading: () => <p>Loading Babylon Scene...</p>
});

interface PageProps {
  params: { splatId: string };
}

export async function generateStaticParams() {
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const files = fs.readdirSync(splatsDirectory);

  // Return only files with .splat or .ply extensions
  return files
    .filter((file) => file.endsWith('.splat') || file.endsWith('.ply'))
    .map((file) => ({
      splatId: path.parse(file).name,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Splat Viewer: ${params.splatId}`,
  };
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
    return <div className="text-center text-red-600">Error: Splat file not found</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">
            Welcome to the Splat Viewer
          </h1>
          <p className="mt-2">
            You are viewing the splat file: <strong>{splatId}</strong>
          </p>
        </div>
      </header>
      <main>
        <div className="container mx-auto py-6 sm:px-6 lg:px-8">
          <div className="p-4 sm:p-0">
            <DynamicBabylonScene initialSplatPath={splatUrl} />
          </div>
        </div>
      </main>
    </div>
  );
}
