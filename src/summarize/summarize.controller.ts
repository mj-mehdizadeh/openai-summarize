import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { memoryStorage } from 'multer';

import { AuthenticatedUser } from '../auth/decorators/auth.decorator';
import { SummarizeRequestDto } from './dto/summarize-request.dto';
import { SummarizeService } from './summarize.service';

@Controller({ version: '1', path: 'summarize' })
@ApiSecurity('auth')
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: +(process.env.MAX_FILE_SIZE_BYTE || 20000000),
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() data: SummarizeRequestDto,
    @AuthenticatedUser() user,
  ) {
    return this.summarizeService.summarize(file, user.id);
  }

  @Get()
  summarize(@AuthenticatedUser() user) {
    return this.summarizeService.findAll(user.id);
  }
}
