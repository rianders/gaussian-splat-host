import fs from 'fs'
import path from 'path'
import SplatList from './components/SplatList'

export default function Home({ splats }: { splats: string[] }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gaussian Splat Viewer
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <SplatList splats={splats} />
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const splatsDirectory = path.join(process.cwd(), 'public/splats')
  const splatFiles = fs.readdirSync(splatsDirectory)
  
  const splats = splatFiles
    .filter(file => file.endsWith('.splat'))
    .map(file => file.replace('.splat', ''))

  return {
    props: {
      splats
    }
  }
}
