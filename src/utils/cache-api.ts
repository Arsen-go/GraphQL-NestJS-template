import * as cache from 'memory-cache';

import { APIListForCacheEnum } from '@Constants/enums';
import { APIListForCaching } from '@Constants/variables/api-list-for-caching';
import { DBQueryListForCacheEnum } from '@/constants/enums/db-query-list-for-cache.enum';
import { DBQueryListForCaching } from '@/constants/variables/db-query-list-for-caching';

export const GetCachedAPI = (
  apiName: string,
): { name: APIListForCacheEnum; expireTime: number } =>
  APIListForCaching.find(
    (object: { name: APIListForCacheEnum; expireTime: number }) =>
      object.name === apiName,
  );

export const GetCachedDBQuery = (
  apiName: string,
): { name: DBQueryListForCacheEnum; expireTime: number } =>
  DBQueryListForCaching.find(
    (object: { name: DBQueryListForCacheEnum; expireTime: number }) =>
      object.name === apiName,
  );

export const GetCachedData = async (cacheKey: string): Promise<any> => {
  return cache.get(cacheKey);
};

export const SetCache = (
  cacheKey: string,
  data: any,
  expireTime: number,
): void => {
  cache.put(cacheKey, data, expireTime);
};

export const GetCacheKey = (apiName: string, userId?: number): string => {
  switch (apiName) {
    case APIListForCacheEnum.X_API_NAME:
      return `some logic for cache key`;
    default:
      return `${apiName}#${userId}`;
  }
};

export const GetDBQueryCacheKey = (
  query: DBQueryListForCacheEnum,
  userId?: number,
): string => {
  switch (query) {
    case DBQueryListForCacheEnum.X_DB_QUERY:
      return `some logic for cache key`;
    default:
      return `${query}#${userId}`;
  }
};
