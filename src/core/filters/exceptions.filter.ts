import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { isObject } from 'lodash';
import { LoggerHelper } from '@core/helpers';
import { AuthHelper } from '@modules/auth/helpers';
import { Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {
  }

  public verbose(host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    LoggerHelper.verbose(JSON.stringify({
      user: AuthHelper.getUser()?.id,
      method: request.method,
      endpoint: request.originalUrl
        ?.replace(/(\/auth\/refresh\/)([\w._-]*?)$/, '$1TOKEN_HIDDEN')
        ?.replace(/(\?token=)(.*?)(&)/, '$1TOKEN_HIDDEN$3'),
      payload: { ...request.body, ...(request.body?.password ? { password: 'PASSWORD_HIDDEN' } : {}) },
    }), 'Request');
  }

  public log(exception: Error): void {
    LoggerHelper.error(exception.message, exception.name, 'Application');
    LoggerHelper.debug(exception.stack, exception.name);
  }

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    this.log(exception);
    this.verbose(host);

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : exception.message;

    httpAdapter.reply(
      ctx.getResponse(),
      (isObject(message) ? message : {
        message: exception.message,
        name: 'error',
      }),
      status,
    );
  }
}
