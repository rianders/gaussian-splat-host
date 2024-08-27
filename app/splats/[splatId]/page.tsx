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

  // Add logic to render the splat content, e.g., using Babylon.js or another viewer

  return (
    <div className="min-h-screen">
      {/* Add your component to render the splat file */}
      <h1>Viewing: {splatId}</h1>
      {/* Render the viewer component here */}
    </div>
  );
}

export async function generateStaticParams() {
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const files = fs.readdirSync(splatsDirectory);

  const splats = files.filter(file => file.endsWith('.splat') || file.endsWith('.ply'));

  return splats.map(splat => ({
    splatId: splat.replace(/\.[^/.]+$/, '')
  }));
}
