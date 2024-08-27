import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const splatsDirectory = path.join(process.cwd(), 'public', 'splats');
  const files = fs.readdirSync(splatsDirectory);

  // Filter for .splat and .ply files
  const splats = files.filter(file => file.endsWith('.splat') || file.endsWith('.ply'));

  // Return file paths relative to the public directory
  const splatPaths = splats.map(file => `/splats/${file}`);

  return NextResponse.json(splatPaths);
}
