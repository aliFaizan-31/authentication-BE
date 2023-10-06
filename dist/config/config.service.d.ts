import { ConfigService } from '@nestjs/config';
export declare class AppConfigService extends ConfigService {
    constructor();
    get APP_NAME(): string;
    get PORT(): number;
    get MONGO_URI(): string;
    get JWT_SECRET(): string;
    get SWAGGER_PATH(): string;
    get VERSION(): string;
}
