import fs from 'fs';
import path from 'path';
import SplatList from '../components/SplatList';

export default function SplatListPage() {
  // Read the splats directory directly within the component
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const files = fs.readdirSync(splatsDirectory);

  // Filter for .splat and .ply files
  const splats = files.filter(file => file.endsWith('.splat') || file.endsWith('.ply'));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <SplatList splats={splats} />
    </div>
  );
}

// This function is used to generate static parameters for dynamic routes
export async function generateStaticParams() {
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const files = fs.readdirSync(splatsDirectory);

  const splats = files.filter(file => file.endsWith('.splat') || file.endsWith('.ply'));

  return splats.map(splat => ({
    params: { splatId: splat.replace(/\.[^/.]+$/, '') }
  }));
}
