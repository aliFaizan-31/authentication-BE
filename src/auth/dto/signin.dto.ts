import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    type: String,
    description: 'Email of the user who wants to log into the application',
    example: 'xyz@example.com'
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password of the user who wants to log into the application',
    example: 'test123@'
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
