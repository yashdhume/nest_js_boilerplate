import { DataSource, DataSourceOptions } from 'typeorm';
import typeormConfig from '@server/db/typeorm.config';

export const dataSource = new DataSource({
  ...(typeormConfig as DataSourceOptions),
});
