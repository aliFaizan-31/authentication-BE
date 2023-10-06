import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    type: String,
    description: 'Name of the user who wants to register',
    example: 'John'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email of the user who wants to register',
    example: 'xyz@example.com'
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    example: 'test123@'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

}
