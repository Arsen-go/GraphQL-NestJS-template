import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs/internal/Observable';
import { performance } from 'node:perf_hooks';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    initialContext: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const isRestApiRequest = !!initialContext.switchToHttp().getRequest();

    if (isRestApiRequest) return next.handle();

    const ctx = GqlExecutionContext.create(initialContext);
    const context = ctx.getContext();
    const req = context.req;
    const apiName = ctx.getArgByIndex(3)?.fieldName;

    return next.handle().pipe(
      tap((data) => {
        const requestStart = req?.requestStartTime ?? 0;

        const responseTime = performance.now() - requestStart;

        if (context.connection) return;

        console.info(`${apiName}: ${responseTime}`);
      }),
    );
  }
}
