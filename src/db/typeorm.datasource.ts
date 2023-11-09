import { DataSource, DataSourceOptions } from 'typeorm';
import typeormConfig from '@server/config/db/typeorm.config';

export const dataSource = new DataSource({
  ...(typeormConfig as DataSourceOptions),
});
