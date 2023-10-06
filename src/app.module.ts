import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'class-validator';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        uri: config.MONGO_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),

    ConfigModule.forRoot({
      validate,
      expandVariables: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule { }
