import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { UserService } from '@server/user/user/user.service';
import { FirebaseAuthService } from '@server/firebase/firebase-auth.service';
import { UserEntity } from '@server/user/user/user.entity';
import { AuthStrategy } from '@server/auth/enums/auth-stategy.enum';
import { UserNotFoundException } from '@server/user/exception/user-not-found-exception';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.FIREBASE,
) {
  constructor(
    private readonly userService: UserService,
    private readonly firebaseAuthService: FirebaseAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string): Promise<UserEntity | undefined> {
    const firebaseUser = await this.firebaseAuthService.validateToken(token);
    const user = await this.userService.findByFirebaseID(firebaseUser.uid);
    if (user == null) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
