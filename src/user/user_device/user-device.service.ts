import { Injectable } from '@nestjs/common';
import { CrudService } from '@server/common/base/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@server/user/user/user.entity';
import { UserDeviceEntity } from '@server/user/user_device/user-device.entity';
import { UpdateUserDeviceDto } from '@server/user/user_device/dto/update.user-device.dto';

@Injectable()
export class UserDeviceService extends CrudService<UserDeviceEntity> {
  constructor(
    @InjectRepository(UserDeviceEntity)
    protected readonly repo: Repository<UserDeviceEntity>,
  ) {
    super(repo, 'Notification Token');
  }
  findByUserId(id: string): Promise<UserDeviceEntity[]> {
    return this.repo.find({
      where: { user: { id } },
    });
  }
  async updateTokenData(
    currentUser: UserEntity,
    data: UpdateUserDeviceDto,
  ): Promise<UserDeviceEntity> {
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
      os: data.os,
      model: data.model,
      user: currentUser,
    });
  }
}
