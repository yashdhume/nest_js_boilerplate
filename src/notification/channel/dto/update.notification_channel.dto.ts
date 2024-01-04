import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '@server/auth/enums/user-role.enum';

export class UpdateNotificationChannelDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => ('' + value).toUpperCase())
  @IsEnum(UserRole)
  userRole?: UserRole;
}
