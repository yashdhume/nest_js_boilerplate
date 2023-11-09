import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@server/common/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@server/user/user/user.entity';

@Entity('address')
export class AddressEntity extends BaseEntity {
  @ApiProperty({ description: 'The city' })
  @Column('varchar')
  city!: string;

  @ApiProperty({ description: 'The district' })
  @Column({ type: 'varchar', nullable: true })
  district?: string;

  @ApiProperty({ description: 'The province' })
  @Column('varchar')
  province!: string;

  @ApiProperty({ description: 'The country' })
  @Column({ type: 'varchar' })
  country!: string;

  @ApiProperty({ description: 'The postal code' })
  @Column({ type: 'varchar', name: 'postal_code', nullable: true })
  postalCode?: string;

  @ManyToOne(() => UserEntity, user => user.address)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
