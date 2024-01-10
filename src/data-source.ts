import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { databaseConfig } from './config/database.config';
import { City } from './modules/city/entities/city.entity';
import { Role } from './modules/role/entities/role.entity';

export const AppDataSource = new DataSource({
  ...(databaseConfig as MysqlConnectionOptions),
  entities: [City, Role],
  migrations: ['src/migrations/*.ts'],
});
