import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @ApiProperty({ example: '9a42511c-c4b3-4b51-98e7-0ca484760792' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiHideProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiHideProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiHideProperty()
  @VersionColumn()
  version: number;

  @ApiHideProperty()
  @DeleteDateColumn()
  deletedAt?: Date;
}
