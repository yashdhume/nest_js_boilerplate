import { Module } from '@nestjs/common';
import { NotificationChannelService } from '@server/notification/channel/notification_channel.service';
import { NotificationChannelController } from '@server/notification/channel/notification_channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationChannelEntity } from '@server/notification/channel/notification_channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationChannelEntity])],
  providers: [NotificationChannelService],
  controllers: [NotificationChannelController],
  exports: [NotificationChannelService],
})
export class NotificationChannelModule {}
