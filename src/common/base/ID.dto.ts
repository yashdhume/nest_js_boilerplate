import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IDDto {
  @IsUUID(4)
  @ApiProperty()
  id!: string;
}
