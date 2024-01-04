import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDeviceService } from '@server/user/user_device/user-device.service';
import { UserDeviceEntity } from '@server/user/user_device/user-device.entity';
import { UserDeviceController } from '@server/user/user_device/user-device.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDeviceEntity])],
  providers: [UserDeviceService],
  controllers: [UserDeviceController],
  exports: [UserDeviceService],
})
export class UserDeviceModule {}
