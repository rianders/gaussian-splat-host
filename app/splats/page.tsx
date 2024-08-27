import fs from 'fs';
import path from 'path';
import SplatList from '../components/SplatList';

interface SplatListPageProps {
  splats: string[];
}

export default function SplatListPage({ splats }: SplatListPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <SplatList splats={splats} />
    </div>
  );
}

export async function getStaticProps() {
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const files = fs.readdirSync(splatsDirectory);

  const splats = files.filter(file => file.endsWith('.splat') || file.endsWith('.ply'));

  return {
    props: {
      splats,
    },
  };
}
