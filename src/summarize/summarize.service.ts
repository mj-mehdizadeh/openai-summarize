import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileHelperService } from '../file-helper/file-helper.service';
import { SummaryEntity } from './entities/summary.entity';

@Injectable()
export class SummarizeService {
  constructor(
    @InjectRepository(SummaryEntity)
    public model: Repository<SummaryEntity>,
    private readonly fileHelperService: FileHelperService,
  ) {}

  async summarize(file: Express.Multer.File, userId: number) {
    const content = await this.fileHelperService.processFile(file);

    const record = await this.model.insert({
      userId,
    });
  }
}
