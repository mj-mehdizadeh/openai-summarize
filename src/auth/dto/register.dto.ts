import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Ali' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Alizadeh' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: '12345678' })
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
