import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { getCurrentTime } from 'src/utils/util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const timestamp = getCurrentTime();

    response.status(status).json({
      code: status,
      timestamp,
      path: request.url,
      method: request.method,
      message: exception.message || HttpException.name,
    });
  }
}
