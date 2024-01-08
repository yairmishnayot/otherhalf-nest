import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { databaseConfig } from './config/database.config';
import { City } from './city/entities/city.entity';

export const AppDataSource = new DataSource({
  ...(databaseConfig as MysqlConnectionOptions),
  entities: [City],
  migrations: ['src/migrations/*.ts'],
});
