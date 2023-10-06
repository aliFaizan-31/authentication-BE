import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';

@Module({
  imports: [

    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.JWT_SECRET,
        signOptions: { expiresIn: 3600 },
      }),
      inject: [AppConfigService],
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),

  ],
  controllers: [AuthController],
  providers: [AuthService, AppConfigService],
})
export class AuthModule {}
