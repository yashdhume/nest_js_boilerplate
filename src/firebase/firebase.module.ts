import { Module } from '@nestjs/common';
import { FirebaseService } from '@server/firebase/firebase.service';
import { FirebaseAuthService } from '@server/firebase/firebase-auth.service';

@Module({
  providers: [FirebaseService, FirebaseAuthService],
  exports: [FirebaseService, FirebaseAuthService],
})
export class FirebaseModule {}
