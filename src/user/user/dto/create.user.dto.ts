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
import { CreateUserDeviceDto } from '@server/user/user_device/dto/create.user-device.dto';
import { UserDeviceEntity } from '@server/user/user_device/user-device.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Y0hYEkX9S3UDGoD4l961LxOsZFj2' })
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

  @ApiProperty({ description: 'Male, Female etc. ', example: 'MALE' })
  @Transform(({ value }) => ('' + value).toUpperCase())
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty({ type: CreateAddressDTO, isArray: true })
  @Type(() => CreateAddressDTO)
  @IsArray()
  @ValidateNested({ each: true })
  address: AddressEntity[];

  @ApiProperty({ type: CreateUserDeviceDto, isArray: true })
  @Type(() => CreateUserDeviceDto)
  @IsArray()
  @ValidateNested({ each: true })
  notificationTokens: UserDeviceEntity[];
}
