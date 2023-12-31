import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '@server/user/address/address.module';
import { UserService } from '@server/user/user/user.service';
import { UserController } from '@server/user/user/user.controller';
import { UserEntity } from '@server/user/user/user.entity';
import { UserDeviceModule } from '@server/user/user_device/user-device.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AddressModule,
    UserDeviceModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
