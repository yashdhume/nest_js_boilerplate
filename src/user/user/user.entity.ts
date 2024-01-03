import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '@server/user/address/address.entity';
import { Gender } from '@server/user/enums/gender.enum';
import { BaseEntity } from '@server/common/base/base.entity';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { UserDeviceEntity } from '@server/user/user_device/user-device.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty({ example: '12345' })
  @Column({ type: 'varchar', unique: true })
  firebaseUID!: string;

  @ApiProperty({ example: 'Joe Doe' })
  @Column('varchar')
  name!: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @Column({ type: 'varchar', unique: true })
  email!: string;

  @ApiProperty({ example: 'USER' })
  @Column({ default: UserRole.USER, type: 'enum', enum: UserRole })
  role: number;

  @ApiProperty({ example: 'Oct 17 1997' })
  @Column({ type: 'timestamptz' })
  dateOfBirth!: Date;

  @ApiProperty({ description: 'Male, Female etc. ' })
  @Column({ type: 'enum', enum: Gender, default: Gender.NONE })
  gender!: Gender;

  @ApiProperty({ example: 'Mississauga' })
  @OneToMany(() => AddressEntity, address => address.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  address: AddressEntity[];

  @ApiProperty({ example: { deviceToken: 'id', fcmToken: 'id' } })
  @OneToMany(() => UserDeviceEntity, userDevice => userDevice.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  userDevices: UserDeviceEntity[];
}
