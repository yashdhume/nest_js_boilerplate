import { Controller, Get } from '@nestjs/common';
import swaggerSchema from '@server/swagger.schema.json';
import { Public } from '@server/auth/decorators/public.decorator';

@Controller('')
export class AppController {
  @Get('json')
  @Public()
  getSwaggerJson() {
    return swaggerSchema;
  }
}
