import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as Firebase from 'firebase-admin';
import { FirebaseService } from '@server/firebase/firebase.service';
import { Strings } from '@server/common/strings';

@Injectable()
export class FirebaseAuthService {
  private firebase: Firebase.app.App;

  constructor(firebaseService: FirebaseService) {
    this.firebase = firebaseService.app;
  }

  async validateToken(token: string): Promise<string> {
    try {
      return await this.firebase
        .auth()
        .verifyIdToken(token, true)
        .then(decodedToken => {
          if (!decodedToken.email_verified && decodedToken.email) {
            throw new UnauthorizedException(
              'Please log in again to verify your email.',
            );
          }
          return decodedToken.uid;
        });
    } catch (error: any) {
      if (error.code === 'auth/user-disabled') {
        throw new UnauthorizedException(Strings.disabledAccount);
      } else if (error.code === 'auth/id-token-expired') {
        throw new UnauthorizedException(Strings.tokenExpiredError);
      } else throw new UnauthorizedException(Strings.somethingWentWrong);
    }
  }
}
