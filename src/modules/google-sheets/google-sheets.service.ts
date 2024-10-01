// src/modules/google-sheets/google-sheets.service.ts

import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private sheetsService: sheets_v4.Sheets;

  constructor() {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      throw new Error('Missing Google API credentials');
    }

    // Handle escaped newlines in the private key
    const formattedPrivateKey = privateKey.replace(/\\n/gm, '\n');

    // Initialize JWT auth client
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    // Initialize Sheets API client
    this.sheetsService = google.sheets({ version: 'v4', auth });
  }

  async getSheetData(spreadsheetId: string, range: string) {
    try {
      const response = await this.sheetsService.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      return response.data.values;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch data from Google Sheets: ${error.message}`,
      );
    }
  }
}
