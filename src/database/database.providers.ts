import * as dotenv from 'dotenv';

import { Sequelize } from 'sequelize-typescript';
import models from './models';

dotenv.config();

let sequelize: Sequelize;
(async () => {
  sequelize = new Sequelize({
    dialect: 'postgres', // DB dialect , here is used postgresql
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    logging: false,
    models,
  });

  await sequelize.authenticate();
})();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: () => sequelize,
  },
];
