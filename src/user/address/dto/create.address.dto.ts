import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDTO {
  @ApiProperty({ example: '123 Dave St', description: 'The city' })
  @IsString()
  street!: string;

  @ApiProperty({ example: '123', description: 'The city' })
  @IsOptional()
  @IsString()
  houseNumber?: string;

  @ApiProperty({ example: 'Mississauga', description: 'The city' })
  @IsString()
  city!: string;

  @ApiProperty({ example: 'Meadowvale Village', description: 'The district' })
  @IsString()
  district?: string;

  @ApiProperty({ example: 'Ontario', description: 'The province' })
  @IsString()
  province!: string;

  @ApiProperty({ example: 'Canada', description: 'The country' })
  @IsString()
  country!: string;

  @ApiProperty({ example: 'L5W 1K2', description: 'The postal code' })
  @IsOptional()
  @IsString()
  postalCode?: string;
}
