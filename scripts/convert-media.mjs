import { spawn } from 'node:child_process';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'media');
const outputDir = path.join(root, 'public', 'media');

const imageExt = new Set(['.png', '.jpg', '.jpeg']);
const videoExt = new Set(['.mp4', '.mov', '.m4v']);

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} a quitté avec le code ${code}`));
    });
  });
}

await mkdir(outputDir, { recursive: true });

const files = await walk(sourceDir);
let images = 0;
let videos = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const relative = path.relative(sourceDir, file);
  const targetBase = path.join(outputDir, relative).replace(/\.[^.]+$/, '');

  if (imageExt.has(ext)) {
    await mkdir(path.dirname(targetBase), { recursive: true });
    await sharp(file)
      .rotate()
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`${targetBase}.webp`);
    images += 1;
    continue;
  }

  if (videoExt.has(ext)) {
    await mkdir(path.dirname(targetBase), { recursive: true });
    await run('ffmpeg', [
      '-y',
      '-i',
      file,
      '-map',
      '0:v:0',
      '-map',
      '0:a?',
      '-c:v',
      'libvpx-vp9',
      '-crf',
      '34',
      '-b:v',
      '0',
      '-row-mt',
      '1',
      '-c:a',
      'libopus',
      '-b:a',
      '96k',
      `${targetBase}.webm`,
    ]);
    videos += 1;
  }
}

console.log(`Médias convertis : ${images} image(s), ${videos} vidéo(s).`);
