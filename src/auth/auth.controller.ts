import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ResponseModel } from '../model/response.model';


@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() signUpDto: SignUpDto): Promise<ResponseModel> {
    return this.authService.signUp(signUpDto);
  }


  @Post('/login')
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInDto: SignInDto): Promise<ResponseModel> {
    return this.authService.signIn(signInDto);
  }


}
