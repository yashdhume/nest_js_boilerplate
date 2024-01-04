import { Injectable } from '@nestjs/common';
import { CrudService } from '@server/common/base/crud.service';
import { NotificationChannelEntity } from '@server/notification/channel/notification_channel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '@server/auth/enums/user-role.enum';

@Injectable()
export class NotificationChannelService extends CrudService<NotificationChannelEntity> {
  constructor(
    @InjectRepository(NotificationChannelEntity)
    protected readonly repo: Repository<NotificationChannelEntity>,
  ) {
    super(repo, 'NotificationChannel');
  }
  findByRole(role: UserRole): Promise<NotificationChannelEntity[]> {
    return this.repo.find({ where: { userRole: role } });
  }
}
