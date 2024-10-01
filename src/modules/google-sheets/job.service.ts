// src/modules/google-sheets/job.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleSheetsService } from './google-sheets.service';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  // @Cron(CronExpression.EVERY_HOUR)
  // async handleCron() {
  //   const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Store in .env
  //   const range = 'Sheet1!A1:E10'; // Adjust the range as needed
  //
  //   try {
  //     const data = await this.googleSheetsService.getSheetData(
  //       spreadsheetId,
  //       range,
  //     );
  //     // Process the data as needed
  //     this.logger.log(`Fetched data: ${JSON.stringify(data)}`);
  //   } catch (error) {
  //     this.logger.error('Error fetching data from Google Sheets', error.stack);
  //   }
  // }
}
