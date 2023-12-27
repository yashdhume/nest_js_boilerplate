import { Injectable } from '@nestjs/common';
import { CrudService } from '@server/common/base/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationTokenEntity } from '@server/user/notification_token/notification-token.entity';
import { UpdateNotificationTokenDto } from '@server/user/notification_token/dto/update.notification-token.dto';
import { UserEntity } from '@server/user/user/user.entity';

@Injectable()
export class NotificationTokenService extends CrudService<NotificationTokenEntity> {
  constructor(
    @InjectRepository(NotificationTokenEntity)
    protected readonly repo: Repository<NotificationTokenEntity>,
  ) {
    super(repo, 'Notification Token');
  }
  findByUserId(id: string): Promise<NotificationTokenEntity[]> {
    return this.repo.find({
      where: { user: { id } },
    });
  }
  async updateTokenData(
    currentUser: UserEntity,
    data: UpdateNotificationTokenDto,
  ): Promise<NotificationTokenEntity> {
    const tokens = await this.findByUserId(currentUser.id);
    const byDeviceId = tokens.find(e => e.deviceId === data.deviceId);
    if (byDeviceId) {
      if (byDeviceId.fcmToken === data.fcmToken) return byDeviceId;
      return this.update(byDeviceId.id, {
        fcmToken: data.fcmToken,
      });
    }
    const byFcmToken = tokens.find(e => e.fcmToken === data.fcmToken);
    if (byFcmToken)
      return this.update(byFcmToken.id, {
        deviceId: data.deviceId,
      });
    return this.create({
      deviceId: data.deviceId,
      fcmToken: data.fcmToken,
      user: currentUser,
    });
  }
}
