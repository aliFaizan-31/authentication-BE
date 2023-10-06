import { AuthService } from "./auth.service";
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ResponseModel } from '../model/response.model';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<ResponseModel>;
    signIn(signInDto: SignInDto): Promise<ResponseModel>;
}
