import { DeepPartial, In, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Strings } from '@server/common/strings';
import { ICrudService } from '@server/common/base/interfaces/crud.interface.service';
import { DBOrder } from '@server/common/enums';
import { BaseQueryDto } from '@server/common/base/interfaces/base.query.dto';

export class CrudService<T> implements ICrudService<T> {
  private readonly notFoundErrorMsg: string;
  protected constructor(
    protected readonly repo: Repository<T>,
    readonly className: string,
  ) {
    this.notFoundErrorMsg = this.className + ' ' + Strings.notFound;
  }

  async findOne(id: string): Promise<T> {
    const data = await this.repo.findOne(<T>{ where: { id: id } });
    if (data == null) throw new BadRequestException(this.notFoundErrorMsg);
    return data;
  }

  async find(query: BaseQueryDto): Promise<T[]> {
    return await this.repo.find(<T>{
      take: query.limit,
      skip: query.page,
      order: { createdAt: query.order ?? DBOrder.ASCENDING },
    });
  }

  async findByManyIds(ids: string[]): Promise<T[]> {
    const data = await this.repo.find(<T>{ where: { id: In(ids) } });
    if (data == null) throw new BadRequestException(this.notFoundErrorMsg);
    return data;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return await this.repo.save(data);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    const u = await this.findOne(id);
    if (u == null) throw new BadRequestException(this.notFoundErrorMsg);
    return await this.repo.save(Object.assign(u, data));
  }

  async delete(id: string): Promise<void> {
    const data = await this.findOne(id);
    if (data == null) throw new BadRequestException(this.notFoundErrorMsg);
    await this.repo.softDelete(id);
  }
}
