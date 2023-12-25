import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { RoleMetaDataKey } from '@server/auth/decorators/roles.decorator';
import { ConfigService } from '@nestjs/config';
import { EnvConstants } from '@server/config/env/env.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles =
      this.reflector.getAllAndMerge<UserRole[]>(RoleMetaDataKey, [
        context.getClass(),
        context.getHandler(),
      ]) || [];

    const isPublic = this.reflector.getAllAndOverride<boolean>(
      UserRole.PUBLIC,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;
    if (!this.configService.get<boolean>(EnvConstants.allowAdmin)) {
      return !roles.includes(UserRole.ADMIN);
    }
    return roles
      .map(role => {
        if (context.switchToHttp().getRequest().user.role === UserRole.ADMIN)
          return true;
        return context.switchToHttp().getRequest().user.role === role;
      })
      .includes(true);
  }
}
