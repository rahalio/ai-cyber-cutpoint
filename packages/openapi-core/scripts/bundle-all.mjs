#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const domains = [
  'identity',
  'markets',
  'labelling',
  'discovery',
  'interventions',
  'governance',
];

mkdirSync('src/.bundled', { recursive: true });

for (const d of domains) {
  console.log(`Bundling ${d}...`);
  execSync(
    `redocly bundle ${d} --output src/.bundled/${d}.openapi.yaml`,
    { stdio: 'inherit' }
  );
  execSync(
    `redocly bundle ${d} --output src/.bundled/${d}.json`,
    { stdio: 'inherit' }
  );
}

console.log('Bundled', domains.length, 'domains');
