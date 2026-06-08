import { readFile } from 'node:fs/promises';

const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css'];

for (const file of requiredFiles) {
  const contents = await readFile(file, 'utf8');
  if (!contents.trim()) {
    throw new Error(`${file} is empty`);
  }
}

const html = await readFile('index.html', 'utf8');
const app = await readFile('src/main.js', 'utf8');
const css = await readFile('src/styles.css', 'utf8');

const checks = [
  [html.includes('react.production.min.js'), 'React UMD runtime is included'],
  [html.includes('/src/main.js'), 'Application script is linked'],
  [app.includes('const { createElement: h } = React'), 'Application uses React.createElement alias'],
  [app.includes('drawnNumbers'), 'Drawn numbers data is present'],
  [css.includes('@keyframes bubbleDrop'), 'Dropping bubble animation is defined'],
  [css.includes('@keyframes borderChase'), 'Moving neon border animation is defined'],
  [css.includes('@keyframes playPulse'), 'Winner/play glow animation is defined'],
];

const failed = checks.filter(([passed]) => !passed).map(([, message]) => message);
if (failed.length) {
  throw new Error(`Validation failed:\n- ${failed.join('\n- ')}`);
}

console.log('Static React Keno UI validation passed.');
