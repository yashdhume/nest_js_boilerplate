import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@server/user/user/user.entity';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request: { user: UserEntity } = ctx.switchToHttp().getRequest();

  return request.user;
});
