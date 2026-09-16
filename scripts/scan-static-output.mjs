import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.svg', '.txt', '.xml']);
const forbidden = [
  { label: 'private key', pattern: /BEGIN (?:RSA|OPENSSH) PRIVATE KEY/i },
  {
    label: 'assigned API key',
    pattern: /api[_-]?key\s*[=:]\s*["'][^"']{8,}["']/i,
  },
  {
    label: 'email embedded in a request identifier',
    pattern: /["']?requestId["']?\s*:\s*["'][^"']*@[^"']*["']/i,
  },
];

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? files(path) : [path];
    }),
  );
  return nested.flat();
}

const findings = [];
for (const path of await files(root)) {
  if (!textExtensions.has(extname(path))) continue;
  const contents = await readFile(path, 'utf8');
  for (const rule of forbidden) {
    if (rule.pattern.test(contents)) findings.push(`${relative(root, path)}: ${rule.label}`);
  }
}

if (findings.length) {
  console.error(`Potential secret or personal payload detected:\n${findings.join('\n')}`);
  process.exit(1);
}

console.log('Static output contains no configured secret or personal-payload patterns.');
