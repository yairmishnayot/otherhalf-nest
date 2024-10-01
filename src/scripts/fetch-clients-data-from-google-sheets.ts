// src/scripts/fetch-clients-data-from-google-sheets.ts

import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' }); // Adjust the path to your .env file

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module'; // Adjust the import path
import { GoogleSheetsService } from '@modules/google-sheets/google-sheets.service'; // Adjust the import path if necessary

async function fetchData() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const googleSheetsService = appContext.get(GoogleSheetsService);
  const spreadsheetId: string = process.env.GOOGLE_SHEET_ID || '';
  const range = 'Sheet1!A1:E10'; // Adjust the range as needed

  try {
    const data = await googleSheetsService.getSheetData(spreadsheetId, range);
    console.log('Fetched data:', data);
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
  } finally {
    await appContext.close();
  }
}

fetchData();
