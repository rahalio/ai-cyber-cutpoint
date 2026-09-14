/**
 * Cutpoint API server — boots shared middleware + domain routes + console.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { registerSecurityMiddleware } from './lib/middleware/security-middleware.js';
import { registerResponseEnvelope } from './lib/middleware/response-envelope.middleware.js';
import { setupServerLifecycle, startServer } from './lib/server-startup.js';
import { bootstrapInfrastructure } from './infrastructure/bootstrap.js';
import { registerAllDomainRoutes } from './lib/routes/domain-routes.js';
import { registerSystemRoutes } from './lib/routes/system-routes.js';
import './lib/types/fastify-types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const consoleHtml = readFileSync(join(__dirname, '../public/index.html'), 'utf8');

async function createApp() {
  const fastify = Fastify({
    logger: true,
    requestIdHeader: 'x-request-id',
    genReqId: () => crypto.randomUUID(),
  });

  await fastify.register(cors, {
    origin: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'X-API-Key',
      'Authorization',
      'Idempotency-Key',
    ],
  });
  await fastify.register(helmet, {
    global: true,
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  });

  await bootstrapInfrastructure();
  await registerSecurityMiddleware(fastify);
  registerResponseEnvelope(fastify);
  setupServerLifecycle(fastify);

  fastify.get('/', { config: { scope: 'public' } }, async (_req, reply) => {
    return reply.type('text/html').send(consoleHtml);
  });

  fastify.get('/health', { config: { scope: 'public' } }, async () => ({
    status: 'ok',
    service: 'cutpoint-api',
    sandbox: process.env.CUTPOINT_SANDBOX === '1' || process.env.CUTPOINT_SANDBOX === 'true' || (!process.env.AWS_ENDPOINT_URL && !process.env.LOCALSTACK_ENDPOINT),
  }));

  registerSystemRoutes(fastify);
  await registerAllDomainRoutes(fastify);

  return fastify;
}

const app = await createApp();
await startServer(app);
