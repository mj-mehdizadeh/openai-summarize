import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileHelperModule } from '../file-helper/file-helper.module';
import { OpenaiModule } from '../openai/openai.module';
import { SummaryEntity } from './entities/summary.entity';
import { SummarizeController } from './summarize.controller';
import { SummarizeService } from './summarize.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SummaryEntity]),
    FileHelperModule,
    OpenaiModule,
  ],
  controllers: [SummarizeController],
  providers: [SummarizeService],
})
export class SummarizeModule {}
