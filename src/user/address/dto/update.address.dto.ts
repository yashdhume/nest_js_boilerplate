import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDTO {
  @ApiProperty({ example: '123 Dave St', description: 'The city' })
  @IsOptional()
  @IsString()
  street: string;

  @ApiProperty({ example: '123', description: 'The city' })
  @IsOptional()
  @IsString()
  houseNumber?: string;

  @ApiProperty({ example: 'Mississauga', description: 'The city' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'Meadowvale Village', description: 'The district' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: 'Ontario', description: 'The province' })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiProperty({ example: 'Canada', description: 'The country' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 'L5W 1K2', description: 'The postal code' })
  @IsOptional()
  @IsString()
  postalCode?: string;
}
