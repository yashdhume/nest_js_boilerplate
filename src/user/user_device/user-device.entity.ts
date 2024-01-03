import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '@server/user/user/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { BaseEntity } from '@server/common/base/base.entity';
import { OS } from '@server/user/enums/os.enum';

@Entity('user_device')
export class UserDeviceEntity extends BaseEntity {
  @Column({ type: 'enum', enum: OS, nullable: false })
  os!: OS;

  @Column({ type: 'varchar', nullable: false })
  model!: string;

  @Column({ type: 'varchar', nullable: false })
  deviceId!: string;

  @Column({ type: 'varchar', nullable: false })
  fcmToken!: string;

  @ApiHideProperty()
  @ManyToOne(() => UserEntity, user => user.userDevices)
  @JoinColumn({ name: 'user' })
  user!: UserEntity;
}
