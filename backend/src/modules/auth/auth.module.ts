import config from '@config/config';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
	imports: [
		JwtModule.register({
			secret: config.JWT_SECRET,
			signOptions: { expiresIn: '1h' },
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [
		AuthService,
		JwtModule
	],
})
export class AuthModule {} 