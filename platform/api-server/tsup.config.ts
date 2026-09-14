import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'node20',
  external: [/^@cutpoint\//, /^@aws-sdk\//, /^@fastify\//, 'fastify', 'dotenv', 'jsonwebtoken', 'zod', '@zodios/core'],
});
