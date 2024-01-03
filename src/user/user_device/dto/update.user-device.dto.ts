import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { OS } from '@server/user/enums/os.enum';

export class UpdateUserDeviceDto {
  @ApiProperty({ description: 'UUID' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({ description: 'unique device id' })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiProperty({ description: 'iOS, Android' })
  @IsOptional()
  @Transform(({ value }) => ('' + value).toUpperCase())
  @IsEnum(OS)
  os?: OS;

  @ApiProperty({ description: 'device model', example: 'iPhone 14' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ description: 'Fcm token' })
  @IsOptional()
  @IsString()
  fcmToken?: string;
}
