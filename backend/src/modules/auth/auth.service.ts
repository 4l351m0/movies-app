import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}

	async signPayload(payload: any): Promise<string> {
		return this.jwtService.signAsync(payload);
	}
} 