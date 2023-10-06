"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const logger = new common_1.Logger('Main');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const configService = app.get(config_service_1.AppConfigService);
    const config = new swagger_1.DocumentBuilder()
        .setTitle(configService.APP_NAME)
        .setVersion(configService.VERSION)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(configService.SWAGGER_PATH, app, document);
    await app.listen(configService.PORT);
    logger.log(`App is listening at PORT ${configService.PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map