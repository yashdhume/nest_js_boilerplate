import { Module } from '@nestjs/common';
import { NotificationController } from '@server/notification/notification.controller';
import { NotificationService } from '@server/notification/notification.service';
import { FirebaseModule } from '@server/firebase/firebase.module';
import { UserDeviceModule } from '@server/user/user_device/user-device.module';
import { NotificationChannelModule } from '@server/notification/channel/notification_channel.module';

@Module({
  imports: [FirebaseModule, UserDeviceModule, NotificationChannelModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
