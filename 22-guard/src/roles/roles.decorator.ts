import { SetMetadata } from '@nestjs/common';

// nest g d roles ile oluşur.

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
