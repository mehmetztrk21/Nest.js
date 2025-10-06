import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
//nest g guard auth
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const token = this.getTokenFromHeader(
      context.switchToHttp().getRequest<Request>(),
    );
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: 'mySecretKey',
      });
      context.switchToHttp().getRequest<Request>()['user'] = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getTokenFromHeader(request: Request): any {
    const token = request.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
      return null;
    }
    return token;
  }
}
