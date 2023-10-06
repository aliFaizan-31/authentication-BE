"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = class AppConfigService extends config_1.ConfigService {
    constructor() {
        super();
    }
    get APP_NAME() {
        return this.get('APP_NAME');
    }
    get PORT() {
        return +this.get('PORT');
    }
    get MONGO_URI() {
        return this.get('MONGO_URI');
    }
    get JWT_SECRET() {
        return this.get('JWT_SECRET');
    }
    get SWAGGER_PATH() {
        return this.get('SWAGGER_PATH');
    }
    get VERSION() {
        return this.get('VERSION');
    }
};
AppConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppConfigService);
exports.AppConfigService = AppConfigService;
//# sourceMappingURL=config.service.js.map