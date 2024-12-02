import { Module } from '@nestjs/common';

import { FileHelperService } from './file-helper.service';

@Module({
  providers: [FileHelperService],
})
export class FileHelperModule {}
