import { Module } from '@nestjs/common';
import { AddressService } from 'src/user/address/address.service';
import { AddressController } from 'src/user/address/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '@server/user/address/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
