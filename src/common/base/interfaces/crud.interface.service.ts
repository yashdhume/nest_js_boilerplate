import { DeepPartial } from 'typeorm';
import { BaseQueryDto } from '@server/common/base/interfaces/base.query.dto';

export interface ICrudService<EntityType> {
  findOne(id: string): Promise<EntityType>;

  find(query: BaseQueryDto): Promise<EntityType[]>;

  findByManyIds(ids: string[]): Promise<EntityType[]>;

  create(data: DeepPartial<EntityType>): Promise<EntityType>;

  update(id: string, data: DeepPartial<EntityType>): Promise<EntityType>;

  delete(id: string): Promise<void>;
}
