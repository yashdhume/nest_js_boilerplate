import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import typeormConfig from '@server/config/db/typeorm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(typeormConfig as TypeOrmModuleOptions),
      autoLoadEntities: true,
    }),
  ],
})
export class DbModule {}
