import { IsInt, IsUUID, Max, Min } from "class-validator";
import { CreateRatingMovieIdSwagger, CreateRatingValueSwagger } from '../../../swagger/ratings-dto.swagger';

export class CreateRatingDto {
	@CreateRatingValueSwagger()
	@IsInt({ message: 'Value for score should be a number' })
	@Min(1, { message: 'The minimun value for rating should be 1' })
	@Max(5, { message: 'The maximun value for rating should be 5' })
	value: number;

	@CreateRatingMovieIdSwagger()
	@IsUUID('4', { message: 'Movie\'s ID format, should be a valid format or ID' })
	movieId: string;
}
