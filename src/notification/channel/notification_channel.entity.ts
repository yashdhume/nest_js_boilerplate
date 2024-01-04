import { BaseEntity } from '@server/common/base/base.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@server/auth/enums/user-role.enum';

@Entity('notification_channel')
export class NotificationChannelEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ApiProperty({ example: 'USER' })
  @Column({ default: UserRole.USER, type: 'enum', enum: UserRole })
  userRole: number;
}
