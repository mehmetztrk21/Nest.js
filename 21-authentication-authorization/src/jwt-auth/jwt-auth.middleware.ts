import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService
  ) { }
  use(req: Request, res: any, next: () => void) {
    const path = req?.originalUrl;
    if (path.startsWith('/user/auth') || path.startsWith('/user/create') || path.startsWith('/auth/login') || path.startsWith('/auth/logout')) {
      next();
      return;
    }
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401).json({ message: "No token provided" });
      return;
    }
    const token = authHeader.split(' ')[1]; // Bearer <token>
    console.log("Token:", token);
    try {
      const decoded = this.jwtService.verify(token, {
        secret: "mySecretKey"
      });
      req.user = decoded;
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    next();
  }
}
