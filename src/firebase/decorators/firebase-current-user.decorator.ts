import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export const FirebaseCurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request: { user: DecodedIdToken } = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
