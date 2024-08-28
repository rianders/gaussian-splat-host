import fs from 'fs';
import path from 'path';

interface SplatPageProps {
  params: {
    splatId: string;
  };
}

export default function SplatPage({ params }: SplatPageProps) {
  const { splatId } = params;

  // Build the path to the splat file
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const splatFilePath = path.join(splatsDirectory, `${splatId}.splat`);

  // Check if the file exists and handle accordingly
  if (!fs.existsSync(splatFilePath)) {
    return <div>Splat not found</div>;
  }

  // Render the content of the splat file
  return (
    <div className="min-h-screen">
      <h1>Viewing: {splatId}</h1>
      {/* Render the viewer component here */}
    </div>
  );
}

// Generates the paths for all splats dynamically during the build
export async function generateStaticParams() {
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const files = fs.readdirSync(splatsDirectory);

  // Filter for .splat and .ply files
  const splats = files.filter(file => file.endsWith('.splat') || file.endsWith('.ply'));

  return splats.map(splat => ({
    splatId: splat.replace(/\.[^/.]+$/, ''),
  }));
}
