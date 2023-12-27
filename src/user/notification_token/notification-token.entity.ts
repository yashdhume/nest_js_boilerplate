import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '@server/user/user/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { BaseEntity } from '@server/common/base/base.entity';

@Entity('notification_token')
export class NotificationTokenEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  deviceId: string;

  @Column({ type: 'varchar', nullable: false })
  fcmToken: string;

  @ApiHideProperty()
  @ManyToOne(() => UserEntity, user => user.notificationTokens)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
