import { ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model } from 'sequelize-typescript';

@ObjectType()
export class BaseModel<T, G> extends Model<T, G> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
