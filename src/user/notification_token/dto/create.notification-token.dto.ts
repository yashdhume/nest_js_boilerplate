import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNotificationTokenDto {
  @ApiProperty({ description: 'unique device id' })
  @IsString()
  deviceId!: string;

  @ApiProperty({ description: 'Fcm token' })
  @IsString()
  fcmToken!: string;
}
