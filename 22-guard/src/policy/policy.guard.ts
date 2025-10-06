import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PolicyConfig } from './policy.decorator';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const policy = this.reflector.get<PolicyConfig>("policy", context.getHandler());
    //context üzerinden diğer yapılara ulaşabiliriz aşağıdaki gibi.
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getRequest();
    const client = context.switchToWs().getClient();
    const ms = context.switchToRpc().getData();
    const handler = context.getHandler();
    const className = context.getClass().name;
    //policy.decorator gibi karmaşık yapılar da kullanabiliriz.
    return true;
  }
}
