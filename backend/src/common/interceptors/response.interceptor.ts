import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const ctx = context.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		return next.handle().pipe(
			map((data) => {
				return {
					statusCode: response.statusCode || 200,
					timestamp: new Date().toISOString(),
					path: request.url,
					message: response.statusMessage || '',
					data: !data ? [] : data,
				};
			})
		);
	}
} 