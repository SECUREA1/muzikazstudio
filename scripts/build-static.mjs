import { cp, mkdir, rm, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outputDirs = ['dist', 'a1'];
const copyNames = new Set([
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
]);
const assetExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.txt']);
const skipDirs = new Set(['.git', 'node_modules', 'dist', 'a1', 'scripts']);

async function collectStaticFiles() {
  const entries = await readdir(root);
  const files = [];

  for (const entry of entries) {
    if (skipDirs.has(entry)) continue;

    const absolutePath = path.join(root, entry);
    const info = await stat(absolutePath);

    if (!info.isFile()) continue;

    const extension = path.extname(entry).toLowerCase();
    if (copyNames.has(entry) || assetExtensions.has(extension)) {
      files.push(entry);
    }
  }

  return files.sort();
}

const files = await collectStaticFiles();

if (!files.includes('index.html')) {
  throw new Error('Cannot build static site: index.html was not found.');
}

for (const outputDir of outputDirs) {
  const outputPath = path.join(root, outputDir);
  await rm(outputPath, { recursive: true, force: true });
  await mkdir(outputPath, { recursive: true });

  for (const file of files) {
    await cp(path.join(root, file), path.join(outputPath, file), { recursive: true });
  }
}

console.log(`Built static site into ${outputDirs.join(' and ')}.`);
