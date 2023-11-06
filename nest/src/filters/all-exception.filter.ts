import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
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
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const timestamp = getCurrentTime();
    const url = request.url;
    console.log(url);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let msg = ERR_MSG_STATUS['other'];
    if (exception instanceof QueryFailedError) {
      if (exception.driverError.errno === 1062) {
        if (ERR_MSG_STATUS[`${request.url}-${request.method}`]) {
          msg = ERR_MSG_STATUS[`${request.url}-${request.method}`];
        }
      }
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
