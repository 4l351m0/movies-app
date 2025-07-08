import { IsString, MinLength } from 'class-validator';
import { LoginPasswordSwagger, LoginUsernameSwagger } from '../../../swagger/auth-dto.swagger';

export class LoginDto {
	@LoginUsernameSwagger()
	@IsString({ message: 'Username must be a string' })
	@MinLength(1, { message: 'Username cannot be empty' })
	username: string;

	@LoginPasswordSwagger()
	@IsString({ message: 'Password must be a string' })
	@MinLength(1, { message: 'Password cannot be empty' })
	password: string;
} 