import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { databaseConfig } from './config/database.config';

export const AppDataSource = new DataSource({
  ...(databaseConfig as MysqlConnectionOptions),
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
