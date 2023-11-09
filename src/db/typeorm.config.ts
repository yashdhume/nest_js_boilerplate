export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  logging: false,
  migrationsTableName: 'migration',
  migrations: ['dist/migrations/*.js'],
  logger: 'advanced-console',
};
