import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileHelperService } from '../file-helper/file-helper.service';
import { OpenaiService } from '../openai/openai.service';
import { SummaryEntity } from './entities/summary.entity';

@Injectable()
export class SummarizeService {
  constructor(
    @InjectRepository(SummaryEntity)
    public model: Repository<SummaryEntity>,
    private readonly fileHelperService: FileHelperService,
    private readonly openaiService: OpenaiService,
  ) {}

  async summarize(file: Express.Multer.File, userId: number) {
    const chunks = await this.fileHelperService.processFileToChunks(file);

    const summaries = [];

    for (const chunk of chunks) {
      const summary = await this.openaiService.summarize(chunk);
      summaries.push(summary);
    }

    // Combine all summaries into a final summary
    const finalSummary = await this.openaiService.summarize(
      summaries.join(' '),
    );

    const record = this.model.create({ userId, result: finalSummary });

    await this.model.insert(record);
    return record;
  }

  async findAll(userId: number) {
    const [data, total] = await this.model.findAndCount({
      where: { userId },
      order: { id: 'DESC' },
    });

    return { data, total };
  }
}
