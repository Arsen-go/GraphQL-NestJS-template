import { DatabaseModelEnum } from '@Constants/enums';
import { User } from '@/database/models/user/user.model';
import { WhereOptions } from 'sequelize';
import { registerDecorator } from 'class-validator';

// Usage
/*
  @ValidateExistence(DatabaseModelEnum.CHILD_JOB)
  childJobId: number;
*/

export function ValidateExistence(model: DatabaseModelEnum) {
  return function (object: { constructor: any }, propertyName: string) {
    registerDecorator({
      propertyName,
      target: object.constructor,
      name: 'ValidateExistence',
      options: {
        always: true,
        message: `${model} does not exists.`,
      },
      constraints: [propertyName],
      validator: {
        async validate(id: number) {
          if (!id) return true;
          const where: WhereOptions = { id };

          let isExists: number;
          switch (model) {
            case DatabaseModelEnum.USER:
              isExists = await User.count({ where });
              break;

            default:
              isExists = 1;
              break;
          }

          return isExists != 0;
        },
      },
    });
  };
}
