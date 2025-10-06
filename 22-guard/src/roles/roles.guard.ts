import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import type { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflactor: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflactor.getAllAndOverride<string[]>('roles', [
      context.getHandler(), // method
      context.getClass(), // controller
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    //tokeni al.
    //useri bul.
    //userin rolleri al.
    const user = { roles: ['manager'] }; // örnek user objesi
    const hasRole = () => user.roles.some((role) => requiredRoles.includes(role));
    if (!user || !user.roles || !hasRole()) {
      return false;
    }
    return true;
  }
}
