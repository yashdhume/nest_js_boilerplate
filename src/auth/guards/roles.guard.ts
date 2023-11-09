import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { RoleMetaDataKey } from '@server/auth/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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
    if (roles.length === 1 && roles[0] === UserRole.SETUP) return true;

    return roles
      .map(role => context.switchToHttp().getRequest().user.role === role)
      .includes(true);
  }
}
