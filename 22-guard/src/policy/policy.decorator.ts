import { SetMetadata } from '@nestjs/common';

export interface PolicyConfig {
    resource: string
    action: string
}

export const Policy = (config: PolicyConfig) => SetMetadata('policy', config);
