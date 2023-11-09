import { Injectable } from '@nestjs/common';
import { CrudService } from '@server/common/base/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '@server/user/address/address.entity';

@Injectable()
export class AddressService extends CrudService<AddressEntity> {
  constructor(
    @InjectRepository(AddressEntity)
    protected readonly repo: Repository<AddressEntity>,
  ) {
    super(repo, 'Address');
  }
}
