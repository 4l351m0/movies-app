import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from '../common/response.dto';
import { LoginDto } from '../modules/auth/dto/login.dto';

export function AuthSwagger() {
  return applyDecorators(
    ApiTags('Auth')
  );
}

export const LoginSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'User login' }),
    ApiResponse({ status: 201, description: 'Login successful.', type: ApiResponseDto }),
    ApiResponse({ status: 401, description: 'Invalid credentials.' }),
    ApiBody({ type: LoginDto })
  ); 