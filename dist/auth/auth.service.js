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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("./schema/user.schema");
let logger = new common_1.Logger('User');
let AuthService = class AuthService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async signUp(signUpDto) {
        try {
            const found = await this.userModel.findOne({
                email: signUpDto.email,
            });
            if (found) {
                logger.error('User already exists!');
                throw new common_1.ConflictException('User already exists!');
            }
            const user = new this.userModel(signUpDto);
            const { password } = signUpDto;
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const userId = user.id;
            const payload = { userId };
            const accessToken = this.jwtService.sign(payload);
            return {
                success: true,
                message: 'User registered successfully',
                data: { user, accessToken }
            };
        }
        catch (err) {
            if (err instanceof common_1.ConflictException) {
                logger.error(err.message);
                throw err;
            }
            else {
                logger.error(err.message);
                throw new common_1.InternalServerErrorException(err.message);
            }
        }
    }
    async signIn(signInDto) {
        try {
            const user = await this.userModel.findOne({
                email: signInDto.email,
            });
            if (!user) {
                logger.error('Invalid credentials');
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const isMatch = await bcrypt.compare(signInDto.password, user.password);
            if (!isMatch) {
                logger.error('Invalid credentials');
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const userId = user.id;
            const payload = { userId };
            const accessToken = this.jwtService.sign(payload);
            return {
                success: true,
                message: 'User logged in successfully',
                data: { user, accessToken }
            };
        }
        catch (err) {
            if (err instanceof common_1.UnauthorizedException) {
                logger.error(err.message);
                throw err;
            }
            else {
                logger.error(err.message);
                throw new common_1.InternalServerErrorException(err.message);
            }
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map