import {
  ConflictException,
  Injectable,
  InternalServerErrorException, Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ResponseModel } from '../model/response.model';
import { SignUpDto } from './dto/signup.dto';
import { User, UserDocument } from './schema/user.schema';
import { JwtPayload } from './interface/jwtPayload.interface';
import { SignInDto } from './dto/signin.dto';
let logger = new Logger('User');

@Injectable()
export class AuthService {
  constructor(
      private jwtService: JwtService,
      @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}


  async signUp(signUpDto: SignUpDto): Promise<ResponseModel> {
    try {
      const found = await this.userModel.findOne({
        email: signUpDto.email,
      });

      if (found) {
        logger.error('User already exists!');
        throw new ConflictException('User already exists!');
      }

      const user = new this.userModel(signUpDto);
      const { password } = signUpDto;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const userId = user.id;
      const payload: JwtPayload = { userId };
      const accessToken = this.jwtService.sign(payload);

      return {
        success: true,
        message: 'User registered successfully',
        data: { user, accessToken }
      }
    }catch (err){
      if (err instanceof ConflictException) {
        logger.error(err.message);
        throw err;
      } else {
        logger.error(err.message);
        throw new InternalServerErrorException(err.message);
      }
    }
  }



  async signIn(signInDto: SignInDto): Promise<ResponseModel> {
    try {
      const user = await this.userModel.findOne({
        email: signInDto.email,
      });
      if (!user) {
        logger.error('Invalid credentials');
        throw new UnauthorizedException('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(signInDto.password, user.password);

      if (!isMatch) {
        logger.error('Invalid credentials');
        throw new UnauthorizedException('Invalid credentials');
      }

      const userId = user.id;
      const payload: JwtPayload = { userId };
      const accessToken = this.jwtService.sign(payload);

      return {
        success: true,
        message: 'User logged in successfully',
        data: { user, accessToken }
      }
    }catch (err){
      if (err instanceof UnauthorizedException) {
        logger.error(err.message);
        throw err;
      }
      else {
        logger.error(err.message);
        throw new InternalServerErrorException(err.message);
      }
    }
  }
}

