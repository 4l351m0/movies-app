import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';
import { AddActorsActorsIdSwagger } from '../../../swagger/movies-dto.swagger';

export class AddActorsDto {
	@AddActorsActorsIdSwagger()
	@IsArray({ message: 'actorsId must be an array' })
	@ArrayNotEmpty({ message: 'actorsId should not be empty' })
	@IsUUID('4', { each: true, message: 'Each actor ID must be a valid UUID' })
	actorsId: string[];
} 