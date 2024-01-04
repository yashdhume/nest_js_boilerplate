import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from '@server/notification/notification.service';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(protected service: NotificationService) {}

  @Get()
  async test() {
    await this.service.test();
    return 'done';
  }
}
