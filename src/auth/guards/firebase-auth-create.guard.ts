import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '@server/auth/enums/auth-stategy.enum';

@Injectable()
export class FirebaseAuthCreateGuard extends AuthGuard(
  AuthStrategy.FIREBASE_CREATE,
) {
  constructor() {
    super();
  }
}
