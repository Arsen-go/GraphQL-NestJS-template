import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  GetCacheKey,
  GetCachedAPI,
  GetCachedData,
  SetCache,
} from '@/utils/cache-api';
import { Observable, of } from 'rxjs';

import { GqlExecutionContext } from '@nestjs/graphql/dist/services/gql-execution-context';
import { map } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  async intercept(
    initialContext: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const isRestApiRequest = !!initialContext.switchToHttp().getRequest();

    if (isRestApiRequest) return next.handle();

    const ctx = GqlExecutionContext.create(initialContext);
    const context = ctx.getContext();
    const req = context.req;

    const apiName: string = ctx.getInfo().fieldName;

    const endpointForCaching: { expireTime: number } = GetCachedAPI(apiName);

    if (!endpointForCaching) return next.handle();

    const cacheKey: string = GetCacheKey(apiName, req.user.id);
    const cachedData = await GetCachedData(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    return next.handle().pipe(
      map((data) => {
        SetCache(cacheKey, data, endpointForCaching.expireTime);

        return data;
      }),
    );
  }
}
