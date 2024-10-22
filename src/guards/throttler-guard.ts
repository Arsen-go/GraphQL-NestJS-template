import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const isGraphQL = context.getType<GqlContextType>() === 'graphql';
    if (isGraphQL) {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext();

      return { req: ctx.req, res: ctx.res };
    }

    // if not GraphQL
    const httpContext = context.switchToHttp();

    return { req: httpContext.getRequest(), res: httpContext.getResponse() };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return await super.canActivate(context);
    } catch (error) {
      throw new HttpException(
        'You are being rate limited. Please try again later.',
        429,
        {
          cause: error,
          description:
            'This exception is thrown when a client exceeds the allowed number of requests within a specified time frame. It serves as a response to protect the server from being overwhelmed by too many requests from a single client.',
        },
      );
    }
  }
}
