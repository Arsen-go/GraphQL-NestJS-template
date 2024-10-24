import { Request, Response } from 'express';

import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

// This filter catches HTTP exceptions thrown in the application.
@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  // The catch method is invoked when an exception is thrown.
  catch(exception: HttpException, host: ArgumentsHost) {
    // Get the HTTP context from the arguments host.
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Retrieve the status code from the exception or the response object.
    const status = exception.getStatus() ?? response.statusCode;

    // Extract the error message, falling back to a default message if necessary.
    const message = exception?.message || 'Internal server error';
    const type: any = host.getType(); // Determine the context type (HTTP or GraphQL)

    // If the request is for a GraphQL endpoint, return the exception directly.
    if (type === 'graphql') {
      return exception;
    }

    // Get the request object for additional information.
    const request = ctx.getRequest<Request>();

    // Construct the JSON response for HTTP exceptions.
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
