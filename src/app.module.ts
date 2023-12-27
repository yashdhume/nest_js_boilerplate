import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@server/app.controller';
import { DbModule } from '@server/db/db.module';
import { AppLoggerMiddleware } from '@server/app.logger.middleware';
import { UserModule } from 'src/user/user/user.module';
import { AuthModule } from '@server/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import envConfig from '@server/config/env/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    DbModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
