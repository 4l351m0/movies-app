import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthSwagger, LoginSwagger } from '../../swagger/auth.swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@AuthSwagger()
@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);

	constructor(private readonly authService: AuthService) {}

	@Post('')
	@LoginSwagger()
	async login(@Body() loginDto: LoginDto) {
		const user = { id: 1, username: loginDto.username };
		const token = await this.authService.signPayload({ sub: user.id, username: user.username });
		this.logger.log(`Login successful for user: ${loginDto.username}`);
		return { access_token: token };
	}
} 