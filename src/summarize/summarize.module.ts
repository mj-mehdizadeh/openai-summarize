import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SummaryEntity } from './entities/summary.entity';
import { SummarizeController } from './summarize.controller';
import { SummarizeService } from './summarize.service';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryEntity])],
  controllers: [SummarizeController],
  providers: [SummarizeService],
})
export class SummarizeModule {}
