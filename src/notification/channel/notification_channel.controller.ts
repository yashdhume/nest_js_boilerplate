import { Controller, Get, UseFilters } from '@nestjs/common';
import { ControllerFactory } from '@server/common/base/crud.controller';
import { NotificationChannelEntity } from '@server/notification/channel/notification_channel.entity';
import { CreateNotificationChannelDTO } from '@server/notification/channel/dto/create.notification_channel.dto';
import { UpdateNotificationChannelDTO } from '@server/notification/channel/dto/update.notification_channel.dto';
import { NotificationChannelService } from '@server/notification/channel/notification_channel.service';
import { Public } from '@server/auth/decorators/public.decorator';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { RolesAllowed } from '@server/auth/decorators/roles.decorator';
import { UserRole } from '@server/auth/enums/user-role.enum';
import {
  UserNotFoundException,
  UserNotFoundExceptionFilter,
} from '@server/user/exception/user-not-found-exception';
import { CurrentUser } from '@server/user/user/decorators/current-user.decorator';
import { UserEntity } from '@server/user/user/user.entity';

@ApiTags('Notification Channel')
@Controller('notification-channel')
@Public()
export class NotificationChannelController extends ControllerFactory<
  NotificationChannelEntity,
  CreateNotificationChannelDTO,
  UpdateNotificationChannelDTO
>(CreateNotificationChannelDTO, UpdateNotificationChannelDTO) {
  constructor(protected service: NotificationChannelService) {
    super();
  }
  @Get('mine')
  @RolesAllowed(UserRole.USER)
  @UseFilters(new UserNotFoundExceptionFilter())
  @ApiNotFoundResponse({ type: UserNotFoundException })
  getMyChannels(
    @CurrentUser() currentUser: UserEntity,
  ): Promise<NotificationChannelEntity[]> {
    return this.service.findByRole(currentUser.role);
  }
}
