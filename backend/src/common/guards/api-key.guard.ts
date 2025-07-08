import config from '@config/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean {
		const request = ctx.switchToHttp().getRequest();
		const apiKey = request.headers['x-api-key'];
		const secret = config.API_SECRET;

		if (!apiKey) {
			throw new UnauthorizedException({
				message: 'API Key required for this operation, Access Denied',
				errorCode: 'API_KEY_REQUIRED',
			});
		}
		if (apiKey !== secret) {
			throw new UnauthorizedException({
				message: 'Invalid API Key, Access Denied',
				errorCode: 'INVALID_API_KEY',
				data: { apiKey }
			});
		}
		return true;
	}
} 