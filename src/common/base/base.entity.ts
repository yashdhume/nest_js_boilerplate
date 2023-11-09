import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ example: '2023-06-24T07:23:53.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2023-06-24T07:23:53.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
