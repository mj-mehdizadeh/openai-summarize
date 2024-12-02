import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}
