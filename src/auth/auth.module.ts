import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@server/user/user/user.module';
import { FirebaseModule } from '@server/firebase/firebase.module';
import { FirebaseAuthStrategy } from '@server/auth/strategies/firebase-auth.strategy';
import { FirebaseAuthCreateStrategy } from '@server/auth/strategies/firebase-auth-create.strategy';

@Module({
  imports: [PassportModule, FirebaseModule, UserModule],
  providers: [FirebaseAuthStrategy, FirebaseAuthCreateStrategy],
})
export class AuthModule {}
