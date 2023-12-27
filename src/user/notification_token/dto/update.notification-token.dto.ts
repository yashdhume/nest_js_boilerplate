import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateNotificationTokenDto {
  @ApiProperty({ description: 'UUID' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ description: 'unique device id' })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiProperty({ description: 'Fcm token' })
  @IsOptional()
  @IsString()
  fcmToken?: string;
}
