import { IsDateString, IsOptional, IsString, Length, MinLength } from "class-validator";
import { CreateActorBirthDateSwagger, CreateActorFirstNameSwagger, CreateActorLastNameSwagger } from '../../../swagger/actors-dto.swagger';

export class CreateActorDto {
	@CreateActorFirstNameSwagger()
	@IsString({ message: 'Actor\'s first name should be a string' })
	@MinLength(1, { message: 'First name cannot be empty' })
	@Length(1, 100, { message: 'First name must be between 1 and 100 characters' })
	firstName: string;

	@CreateActorLastNameSwagger()
	@IsString({ message: 'Actor\'s last name should be a string' })
	@MinLength(1, { message: 'Last name cannot be empty' })
	@Length(1, 100, { message: 'Last name must be between 1 and 100 characters' })
	lastName: string;

	@CreateActorBirthDateSwagger()
	@IsOptional()
	@IsDateString({}, { message: 'Birth Date should be a valid date format like YYYY-MM-DD' })
	birthDate?: string;
}