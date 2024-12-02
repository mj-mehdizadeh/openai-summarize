import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class SummarizeRequestDto {
  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'File binary data',
  })
  @Allow()
  file: Express.Multer.File;
}
