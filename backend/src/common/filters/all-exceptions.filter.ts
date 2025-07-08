import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

interface ErrorResponse {
	statusCode: number;
	timestamp: string;
	path: string;
	message: string;
	[key: string]: unknown;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name);

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let errorResponse: ErrorResponse = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: 'Internal server error',
		};

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const res = exception.getResponse();
			
			if (typeof res === 'string') {
				errorResponse = {
					...errorResponse,
					statusCode: status,
					message: res,
				}
			} else if (typeof res === 'object' && res !== null) {
				errorResponse = {
					...errorResponse,
					statusCode: status,
					...res,
				}
			}
		} else {
			errorResponse = {
				...errorResponse,
				message: typeof exception === 'object' && exception && 'message' in exception 
								? (exception as { message: string }).message 
								: 'Internal server error',
			};
		}

		this.logger.error(
			`Status: ${status} Error: ${JSON.stringify(exception)} Path: ${request.url}`,
		);

		response.status(status).json(errorResponse);
	}
} 