import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService extends ConfigService {
  constructor() {
    super();
  }

  get APP_NAME(): string {
    return this.get('APP_NAME');
  }
  get PORT(): number {
    return +this.get('PORT');
  }

  get MONGO_URI(): string {
    return this.get('MONGO_URI');
  }

  get JWT_SECRET(): string {
    return this.get('JWT_SECRET');
  }

  get SWAGGER_PATH(): string {
    return this.get('SWAGGER_PATH');
  }

  get VERSION(): string {
    return this.get('VERSION');
  }

}
