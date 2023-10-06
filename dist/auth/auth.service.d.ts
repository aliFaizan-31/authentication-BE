import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { ResponseModel } from '../model/response.model';
import { SignUpDto } from './dto/signup.dto';
import { UserDocument } from './schema/user.schema';
import { SignInDto } from './dto/signin.dto';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<UserDocument>);
    signUp(signUpDto: SignUpDto): Promise<ResponseModel>;
    signIn(signInDto: SignInDto): Promise<ResponseModel>;
}
