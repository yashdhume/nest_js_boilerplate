import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTokenEntity } from './notification-token.entity';
import { NotificationTokenService } from '@server/user/notification_token/notification-token.service';
import { NotificationTokenController } from '@server/user/notification_token/notification-token.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTokenEntity])],
  providers: [NotificationTokenService],
  controllers: [NotificationTokenController],
})
export class NotificationTokenModule {}
