import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { FirebaseAuthService } from '@server/firebase/firebase-auth.service';
import { AuthStrategy } from '@server/auth/enums/auth-stategy.enum';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class FirebaseAuthCreateStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.FIREBASE_CREATE,
) {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string): Promise<DecodedIdToken | undefined> {
    return await this.firebaseAuthService.validateToken(token);
  }
}
