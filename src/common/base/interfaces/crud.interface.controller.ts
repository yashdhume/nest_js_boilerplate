import { IDDto } from '@server/common/base/ID.dto';
import { BaseQueryDto } from '@server/common/base/interfaces/base.query.dto';

export interface ICrudController<EntityType, CreateDto, UpdateDto> {
  findOne(id: IDDto): Promise<EntityType>;

  find(query: BaseQueryDto): Promise<EntityType[]>;

  create(create: CreateDto): Promise<EntityType>;

  update(id: IDDto, body: UpdateDto): Promise<EntityType>;

  delete(id: IDDto): Promise<void>;
}
