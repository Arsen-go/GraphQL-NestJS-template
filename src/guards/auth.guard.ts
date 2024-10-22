import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC } from '@Decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this._reflector.get<boolean>(
      IS_PUBLIC,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const connection = ctx.getContext().connection;

    const authToken: string =
      connection?.authorization ?? req.headers?.authorization?.split(' ')[1];

    if (!authToken && !connection) {
      throw new UnauthorizedException('Unauthorized');
    }

    req.user = { id: 1, username: 'x' }; // current user from token

    return true;
  }
}
