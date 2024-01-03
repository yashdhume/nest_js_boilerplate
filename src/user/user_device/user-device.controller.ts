import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ControllerFactory } from '@server/common/base/crud.controller';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@server/user/user/user.entity';
import { CurrentUser } from '@server/user/user/decorators/current-user.decorator';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { RolesAllowed } from '@server/auth/decorators/roles.decorator';
import { IDDto } from '@server/common/base/ID.dto';
import { SuccessResponse } from '@server/common/response/success.response';
import { CreateUserDeviceDto } from '@server/user/user_device/dto/create.user-device.dto';
import { UserDeviceEntity } from '@server/user/user_device/user-device.entity';
import { UpdateUserDeviceDto } from '@server/user/user_device/dto/update.user-device.dto';
import { UserDeviceService } from '@server/user/user_device/user-device.service';

@ApiTags('User Device')
@Controller('user-device')
export class UserDeviceController extends ControllerFactory<
  UserDeviceEntity,
  CreateUserDeviceDto,
  UpdateUserDeviceDto
>(CreateUserDeviceDto, UpdateUserDeviceDto) {
  constructor(protected service: UserDeviceService) {
    super(service);
  }
  @Post('update')
  @RolesAllowed(UserRole.USER)
  @ApiBody({ type: UpdateUserDeviceDto })
  async updateNotification(
    @CurrentUser() currentUser: UserEntity,
    @Body() body: UpdateUserDeviceDto,
  ): Promise<UserDeviceEntity> {
    return this.service.updateTokenData(currentUser, body);
  }
  async delete(): Promise<undefined> {
    return;
  }
  @Delete(':id')
  @RolesAllowed(UserRole.USER)
  @ApiResponse({ type: SuccessResponse })
  async deleteById(
    @CurrentUser() currentUser: UserEntity,
    @Param() params: IDDto,
  ): Promise<SuccessResponse> {
    const value = await this.service.findOne(params.id, ['user']);
    if (value.user.id !== currentUser.id) throw new UnauthorizedException();
    await this.service.delete(params.id);
    return { message: 'Deleted' };
  }
}
