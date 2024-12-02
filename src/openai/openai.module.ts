import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FileHelperModule } from '../file-helper/file-helper.module';
import { OpenaiService } from './openai.service';

@Module({
  imports: [ConfigModule, FileHelperModule],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
