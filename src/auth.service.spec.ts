import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule,  } from '@nestjs/jwt';
import * as supertest from 'supertest';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from './auth/schema/user.schema';
import { SignUpDto } from './auth/dto/signup.dto';
import { SignInDto } from './auth/dto/signin.dto';
import { AuthController } from './auth/auth.controller';
import { TestDatabaseModule } from '../test/test-database.module';

const signUpDto: SignUpDto = {
  name: "test user",
  email: 'test@example.com',
  password: 'testing123@',
};

const signInDto: SignInDto = {
  email: 'test@example.com',
  password: 'testing123@',
};


describe('Auth Service ', () => {
  let authService: AuthService;
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        TestDatabaseModule,
        JwtModule.register({
          secret: "a2v73490wqa4y",
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = moduleFixture.get<AuthService>(AuthService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });



  //**************************************** Signup Test Cases **********************************************//
  describe('Sign up', () => {
    it('should register a new user', async () => {
      const response = await supertest(app.getHttpServer())
        .post('/auth/signup')
        .send(signUpDto)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.data.user.name).toBe(signUpDto.name);
      expect(response.body.data.user.email).toBe(signUpDto.email);
    });

    it('should not register user if it already exists', async () => {
      await authService.signUp(signUpDto);
      const response = await supertest(app.getHttpServer())
        .post('/auth/signup')
        .send(signUpDto)
        .expect(409);

      expect(response.body.message).toBe('User already exists!');
    });

    it('should not register user if invalid email is provided', async () => {
      const updatedSignUpDto = {
        ...signUpDto,
        email: 'test-example.com',
      };
      const response = await supertest(app.getHttpServer())
        .post('/auth/signup')
        .send(updatedSignUpDto)
        .expect(400);

      expect(response.body.message[0]).toBe('email must be an email');
    });

    it('should not register user if password length is less than 8', async () => {
      const updatedSignUpDto = {
        ...signUpDto,
        password: 'test@',
      };
      const response = await supertest(app.getHttpServer())
        .post('/auth/signup')
        .send(updatedSignUpDto)
        .expect(400);

      expect(response.body.message[0]).toBe('password must be longer than or equal to 8 characters');
    });

    it('should not register user if a required field is missing', async () => {
      const updatedSignUpDto = {
        ...signUpDto,
        name: '',
      };
      const response = await supertest(app.getHttpServer())
        .post('/auth/signup')
        .send(updatedSignUpDto)
        .expect(400);

      expect(response.body.message[0]).toBe('name should not be empty');
    });


    it('should not register user if invalid data type of a field is provided', async () => {
      const updatedSignUpDto = {
        ...signUpDto,
        name: 12,
      };
      const response = await supertest(app.getHttpServer())
        .post('/auth/signup')
        .send(updatedSignUpDto)
        .expect(400);

      expect(response.body.message[0]).toBe('name must be a string');
    });

    });


  //**************************************** Login Test Cases **********************************************//

    describe('Login', () => {
      it('should allow user to login if valid credentials are provided', async () => {
        await authService.signUp(signUpDto);
        const response = await supertest(app.getHttpServer())
          .post('/auth/login')
          .send(signInDto)
          .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User logged in successfully');
        expect(response.body.data.user.name).toBe("test user");
        expect(response.body.data.user.email).toBe(signInDto.email);
      });

        it('should not allow user to login if invalid email is provided', async () => {
          const updatedSignInDto = {
            ...signInDto,
            email: "user@example.com"
          }
          const response = await supertest(app.getHttpServer())
            .post('/auth/login')
            .send(updatedSignInDto)
            .expect(401);

          expect(response.body.message).toBe('Invalid credentials');
        });

      it('should not allow user to login if invalid password is provided', async () => {
        const updatedSignInDto = {
          ...signInDto,
          password: "go321@"
        }
        const response = await supertest(app.getHttpServer())
          .post('/auth/login')
          .send(updatedSignInDto)
          .expect(401);

        expect(response.body.message).toBe('Invalid credentials');
      });

      it('should not allow user to login if email is missing', async () => {
        const updatedSignInDto = {
          ...signInDto,
          email: ""
        }
        const response = await supertest(app.getHttpServer())
          .post('/auth/login')
          .send(updatedSignInDto)
          .expect(400);

        expect(response.body.message[0]).toBe('email should not be empty');
      });

      it('should not allow user to login if password is missing', async () => {
        const updatedSignInDto = {
          ...signInDto,
          password: ""
        }
        const response = await supertest(app.getHttpServer())
          .post('/auth/login')
          .send(updatedSignInDto)
          .expect(400);

        expect(response.body.message[0]).toBe('password should not be empty');
      });

    });

  })

