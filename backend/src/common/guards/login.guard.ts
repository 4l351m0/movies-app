import config from '@config/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const jwtToken = request.headers['authorization']?.split(' ')[1];
    const secret = config.JWT_SECRET;

    if (!jwtToken) {
      throw new UnauthorizedException({
        message: 'Access Token was not provided, Access Denied',
        errorCode: 'NO_ACCESS_TOKEN',
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(jwtToken, { secret });
      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Invalid Access Token, Access Denied',
        errorCode: 'INVALID_ACCES_TOKEN',
        data: { error: err?.message }
      });
    }
  }
} 