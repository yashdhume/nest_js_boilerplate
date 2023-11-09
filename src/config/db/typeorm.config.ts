import * as dotenv from 'dotenv';
import envConfig from '@server/config/env/env.config';

dotenv.config();
export default {
  type: 'postgres',
  host: envConfig().db.host,
  username: envConfig().db.username,
  password: envConfig().db.password,
  database: envConfig().db.name,
  logging: envConfig().db.log === 'true',
  port: envConfig().db.port,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrationsTableName: 'migration',
  migrations: ['dist/migrations/*.js'],
  logger: 'advanced-console',
};
