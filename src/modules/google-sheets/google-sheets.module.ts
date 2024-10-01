import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { JobService } from './job.service';

@Module({
  providers: [GoogleSheetsService, JobService],
  exports: [GoogleSheetsService],
})
export class GoogleSheetsModule {}
