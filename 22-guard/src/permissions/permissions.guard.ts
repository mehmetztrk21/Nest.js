import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permissions', [
      context.getHandler(), // method
      context.getClass(), // controller
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    //tokeni al.
    //useri bul.
    //userin permissionları al.
    const user = { permissions: ['product:read'] }; // örnek user objesi
    const hasPermission = () => user.permissions.some((permission) => requiredPermissions.includes(permission));
    if (!user || !user.permissions || !hasPermission()) {
      return false;
    }
    return true;
  }
}
