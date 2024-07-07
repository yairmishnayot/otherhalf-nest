import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfig } from '../../config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederModule } from '../seeder/seeder.module';
import { UserModule } from '../user/user.module';
import { ClientModule } from '../client/client.module';
import { EthnicityModule } from '../ethnicity/ethnicity.module';
import { CityModule } from '../city/city.module';
import { GroupModule } from '../group/group.module';
import { ProjectModule } from '../project/project.module';
import { ReligionStyleModule } from '../religion-style/religion-style.module';
import { RoleModule } from '../role/role.module';
import { UserGroupModule } from '../user-group/user-group.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseFormatInterceptor } from 'src/common/interceptors/response-format/response-format.interceptor';
import { AuthGuard } from '../auth/auth.gurad';
import { ClientInterestModule } from '../client-interest/client-interest.module';
import { InterestLinkModule } from '../interest-link/interest-link.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (): Promise<TypeOrmModuleOptions> =>
        ({
          ...databaseConfig,
          autoLoadEntities: true,
          synchronize: false,
          migrations: ['dist/migrations/*.js'],
          migrationsTableName: 'migrations',
        }) as TypeOrmModuleOptions,
    }),
    SeederModule,
    UserModule,
    ClientModule,
    EthnicityModule,
    CityModule,
    GroupModule,
    ProjectModule,
    ReligionStyleModule,
    RoleModule,
    UserGroupModule,
    AuthModule,
    ClientInterestModule,
    InterestLinkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
