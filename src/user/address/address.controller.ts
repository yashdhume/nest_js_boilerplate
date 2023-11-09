import { Controller, UseGuards } from '@nestjs/common';
import { ControllerFactory } from '@server/common/base/crud.controller';
import { CreateAddressDTO } from '@server/user/address/dto/create.address.dto';
import { AddressService } from '@server/user/address/address.service';
import { AddressEntity } from '@server/user/address/address.entity';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '@server/auth/guards/firebase-auth.guard';
import { RolesGuard } from '@server/auth/guards/roles.guard';
import { UpdateAddressDTO } from '@server/user/address/dto/update.address.dto';

@ApiTags('Address')
@Controller('address')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class AddressController extends ControllerFactory<
  AddressEntity,
  CreateAddressDTO,
  UpdateAddressDTO
>(CreateAddressDTO, UpdateAddressDTO) {
  constructor(protected service: AddressService) {
    super(service);
  }
}
