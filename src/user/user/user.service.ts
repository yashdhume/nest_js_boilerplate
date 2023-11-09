import { Injectable } from '@nestjs/common';
import { UserEntity } from '@server/user/user/user.entity';
import { CrudService } from '@server/common/base/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repo: Repository<UserEntity>,
  ) {
    super(repo, 'User');
  }
  async findByFirebaseID(uid: string): Promise<UserEntity | undefined> {
    return await this.repo.findOne({ where: { firebaseUID: uid } });
  }
}
