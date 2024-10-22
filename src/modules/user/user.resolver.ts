import { Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { User } from '@/database/models/user/user.model';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getMe(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
