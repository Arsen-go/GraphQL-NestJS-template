import { Request, Response } from 'express';

import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus() ?? response.statusCode;

    const message = exception?.message || 'Internal server error';
    const type: any = host.getType();

    if (type === 'graphql') {
      return exception;
    }

    const request = ctx.getRequest<Request>();

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
