import { ApiProperty } from '@nestjs/swagger';

export const ApiResponseStatusCodeSwagger = () => ApiProperty({ example: 200, description: 'HTTP status code' });
export const ApiResponseTimestampSwagger = () => ApiProperty({ example: '2024-05-30T12:34:56.789Z', description: 'Timestamp of the response' });
export const ApiResponsePathSwagger = () => ApiProperty({ example: '/api/endpoint', description: 'Request path' });
export const ApiResponseMessageSwagger = () => ApiProperty({ example: '', description: 'Status message' });
export const ApiResponseDataSwagger = () => ApiProperty({ description: 'Response data' }); 