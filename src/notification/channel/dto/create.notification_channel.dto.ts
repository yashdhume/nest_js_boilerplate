import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '@server/auth/enums/user-role.enum';

export class CreateNotificationChannelDTO {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsEnum(UserRole)
  userRole!: UserRole;
}
