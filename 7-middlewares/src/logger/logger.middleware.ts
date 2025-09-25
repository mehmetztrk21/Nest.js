import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
// nest g middleware logger ile middleware oluşturduk
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    console.log('Body:', req.body);
    next();
  }
}
