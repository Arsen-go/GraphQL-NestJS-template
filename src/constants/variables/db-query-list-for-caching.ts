import { DBQueryListForCacheEnum } from '../enums';

export const DBQueryListForCaching = [
  {
    name: DBQueryListForCacheEnum.X_DB_QUERY,
    expireTime: 600000, // 10 minute
  },
];
