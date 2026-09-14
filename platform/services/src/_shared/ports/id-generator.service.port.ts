/**
 * IdGeneratorService Port — Cutpoint prefixes.
 */

import type { DomainCode } from '@cutpoint/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  mktId(): string;
  lblId(): string;
  dscId(): string;
  itvId(): string;
  govId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
