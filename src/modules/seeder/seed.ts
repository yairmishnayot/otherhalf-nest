import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  await app.close();
}
bootstrap();
