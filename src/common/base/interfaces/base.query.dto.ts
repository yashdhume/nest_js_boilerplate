import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { DBOrder } from '@server/common/enums';

export class BaseQueryDto {
  @ApiProperty({ description: 'How many in one page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(25)
  limit?: number;

  @ApiProperty({ description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(0)
  page?: number;

  @IsOptional()
  @IsEnum(DBOrder)
  order?: DBOrder;
}
