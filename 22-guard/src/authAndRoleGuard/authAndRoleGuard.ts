import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/roles/roles.guard";


export function AuthAndRole(...roles: string[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard)
    )
}