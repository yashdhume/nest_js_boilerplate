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
import { NotificationTokenService } from '@server/user/notification_token/notification-token.service';
import { NotificationTokenEntity } from '@server/user/notification_token/notification-token.entity';
import { UserEntity } from '@server/user/user/user.entity';
import { CurrentUser } from '@server/user/user/decorators/current-user.decorator';
import { CreateNotificationTokenDto } from '@server/user/notification_token/dto/create.notification-token.dto';
import { UpdateNotificationTokenDto } from '@server/user/notification_token/dto/update.notification-token.dto';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { RolesAllowed } from '@server/auth/decorators/roles.decorator';
import { IDDto } from '@server/common/base/ID.dto';
import { SuccessResponse } from '@server/common/response/success.response';

@ApiTags('Notification Token')
@Controller('notification-token')
export class NotificationTokenController extends ControllerFactory<
  NotificationTokenEntity,
  CreateNotificationTokenDto,
  UpdateNotificationTokenDto
>(CreateNotificationTokenDto, UpdateNotificationTokenDto) {
  constructor(protected service: NotificationTokenService) {
    super(service);
  }
  @Post('update')
  @RolesAllowed(UserRole.USER)
  @ApiBody({ type: UpdateNotificationTokenDto })
  async updateNotification(
    @CurrentUser() currentUser: UserEntity,
    @Body() body: UpdateNotificationTokenDto,
  ): Promise<NotificationTokenEntity> {
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
