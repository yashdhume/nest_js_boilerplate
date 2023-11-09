import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AuthStrategy } from '@server/auth/enums/auth-stategy.enum';
import { UserRole } from '@server/auth/enums/user-role.enum';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard(AuthStrategy.FIREBASE) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      UserRole.PUBLIC,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
