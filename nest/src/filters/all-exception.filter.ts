import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIP from 'request-ip';
import { getCurrentTime } from 'src/utils/util';
import { QueryFailedError } from 'typeorm';
import { ERR_MSG_STATUS } from 'src/constants';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const timestamp = getCurrentTime();
    const url = request.url;
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let msg = ERR_MSG_STATUS['other'];
    if (exception instanceof QueryFailedError) {
      if (exception.driverError.errno === 1062) {
        for (const key in ERR_MSG_STATUS) {
          if (request.url.includes(key)) {
            msg = ERR_MSG_STATUS[key];
            break;
          }
        }
      }
    }

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      msg = ERR_MSG_STATUS[401];
    }

    if (exception instanceof BadRequestException) {
      let message;
      if (typeof exception.getResponse() === 'string') {
        message = exception.getResponse();
      } else if (typeof exception.getResponse() === 'object') {
        message = (exception.getResponse() as any).message.join(',');
      }

      msg = {
        code: 400,
        msg: message,
      };
    }

    // const responseBody = {
    //   path: request.url,
    //   method: request.method,
    //   headers: request.headers,
    //   query: request.query,
    //   body: request.body,
    //   params: request.params,
    //   timestamp,
    //   ip: requestIP.getClientIp(request),
    //   exception: exception['name'],
    //   error: msg,
    // };

    const responseBody = {
      code: msg.code,
      message: msg.msg,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
