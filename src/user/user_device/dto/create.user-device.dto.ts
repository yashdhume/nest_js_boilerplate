import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { OS } from '@server/user/enums/os.enum';

export class CreateUserDeviceDto {
  @ApiProperty({ description: 'iOS, Android' })
  @Transform(({ value }) => ('' + value).toUpperCase())
  @IsEnum(OS)
  os!: OS;

  @ApiProperty({ description: 'device model', example: 'iPhone 14' })
  @IsString()
  model!: string;

  @ApiProperty({ description: 'unique device id' })
  @IsString()
  deviceId!: string;

  @ApiProperty({ description: 'Fcm token' })
  @IsString()
  fcmToken!: string;
}
