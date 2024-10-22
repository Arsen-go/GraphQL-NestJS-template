import { registerEnumType } from '@nestjs/graphql';

export enum DatabaseModelEnum {
  USER = 'USER',
  X_MODEL_NAME = 'X_MODEL_NAME',
}

registerEnumType(DatabaseModelEnum, {
  name: 'DatabaseModelEnum',
});
