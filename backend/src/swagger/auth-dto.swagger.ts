import { ApiProperty } from '@nestjs/swagger';

export const LoginUsernameSwagger = () => ApiProperty({ description: 'Username', example: 'user1' });
export const LoginPasswordSwagger = () => ApiProperty({ description: 'Password', example: 'password123' }); 