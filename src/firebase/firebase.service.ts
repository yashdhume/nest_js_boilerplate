import * as Firebase from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin/lib/app/credential';
import { ConfigService } from '@nestjs/config';
import { EnvConstants } from '@server/config/env/env.constants';

@Injectable()
export class FirebaseService {
  public app: Firebase.app.App;

  constructor(private readonly configService: ConfigService) {
    const firebaseParams: ServiceAccount = {
      projectId: this.configService.get<string>(EnvConstants.firebaseProjectId),
      privateKey: this.configService.get<string>(
        EnvConstants.firebasePrivateKey,
      ),
      clientEmail: this.configService.get<string>(
        EnvConstants.firebaseClientEmail,
      ),
    };

    if (Firebase.apps.length) {
      this.app = Firebase.app();
    } else {
      this.app = Firebase.initializeApp({
        credential: Firebase.credential.cert(firebaseParams),
      });
    }
  }
}
