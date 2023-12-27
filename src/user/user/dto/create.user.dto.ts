import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@server/user/enums/gender.enum';
import { Transform, Type } from 'class-transformer';
import { CreateAddressDTO } from '@server/user/address/dto/create.address.dto';
import { AddressEntity } from '@server/user/address/address.entity';
import { CreateNotificationTokenDto } from '@server/user/notification_token/dto/create.notification-token.dto';
import { NotificationTokenEntity } from '@server/user/notification_token/notification-token.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Y0hYEkX9S3UDGoD4l961LxosZFj2' })
  @IsString()
  firebaseUID!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '2023-11-08T04:07:46.969Z' })
  @IsDateString()
  dateOfBirth!: Date;

  @ApiProperty({ description: 'Male, Female etc. ' })
  @Transform(({ value }) => ('' + value).toUpperCase())
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty({ type: CreateAddressDTO, isArray: true })
  @Type(() => CreateAddressDTO)
  @IsArray()
  @ValidateNested({ each: true })
  address: AddressEntity[];

  @ApiProperty({ type: CreateNotificationTokenDto, isArray: true })
  @Type(() => CreateNotificationTokenDto)
  @IsArray()
  @ValidateNested({ each: true })
  notificationTokens: NotificationTokenEntity[];
}
