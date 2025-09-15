import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Custom exception filter triggered');
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message || 'Internal server error',
      timestamp: new Date().toISOString(),
      isSuccess: false,
    });
  }
}
