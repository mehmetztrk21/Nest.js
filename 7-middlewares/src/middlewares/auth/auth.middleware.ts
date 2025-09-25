import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Auth Middleware executed');
    if (req.headers['authorization'] !== 'mysecrettoken') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  }
}

// veya fuction olarak da yazabiliriz
// export function authMiddleware(req: any, res: any, next: () => void) {
//   console.log('Auth Middleware executed');
//   if (req.headers['authorization'] !== 'mysecrettoken') {
//     return res.status(403).json({ message: 'Forbidden' });
//   }
//   next();
// }