import { BelongsTo, Column, DataType, Table } from 'sequelize-typescript';

import { BaseModel } from '../base.model';
import { ObjectType } from '@nestjs/graphql';

interface CreateUserAttributes {
  username: string;
}

@ObjectType()
@Table({ tableName: 'users' })
export class User extends BaseModel<User, CreateUserAttributes> {
  @Column({ type: DataType.STRING, defaultValue: '' })
  username: string;
}
