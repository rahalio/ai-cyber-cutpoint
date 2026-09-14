/**
 * ExecuteGetDependencyMap — hand-maintained (x-repository: none ops skip codegen usecases).
 */

import type { GetDependencyMapInput, GetDependencyMapOutput } from '../dto/dependency-map.dto';
import type { ExecutionContextService, IdGeneratorService } from '@cutpoint/services/_shared/index.js';
import type { DependencyMapRepository } from '../ports';

export class ExecuteGetDependencyMap {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly dependencyMap: DependencyMapRepository
  ) {}

  async execute(input: GetDependencyMapInput): Promise<GetDependencyMapOutput> {
    const correlationId = this.idGenerator.dscId();
    const result = await this.dependencyMap.getDependencyMap({
      ...input,
      orgId: this.context.getOrgId(),
      correlationId,
    } as any);
    return result as GetDependencyMapOutput;
  }
}
