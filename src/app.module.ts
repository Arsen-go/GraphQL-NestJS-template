import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';

import Modules from '@Modules/index';

import { ConfigModuleOptions } from './config/config-module';
import { GraphQlConfig } from './config/graphql-module';
import { Throttler } from './config/throttler';
import { DatabaseModule } from './database/database.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { CustomThrottlerGuard } from './guards/throttler-guard';
import { CacheInterceptor } from './interceptors/caching.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    ThrottlerModule.forRoot(Throttler),
    ConfigModule.forRoot(ConfigModuleOptions),
    GraphQLModule.forRootAsync<ApolloDriverConfig>(GraphQlConfig),
    DatabaseModule,
    ...Modules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
