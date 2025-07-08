import { IsInt, IsString, Length, Max, Min, MinLength } from "class-validator";
import { CreateMovieDurationSwagger, CreateMovieGenresSwagger, CreateMovieGenreSwagger, CreateMoviePosterSwagger, CreateMovieReleaseYearSwagger, CreateMovieSynopsisSwagger, CreateMovieTitleSwagger } from '../../../swagger/movies-dto.swagger';

export class CreateMovieDto {
	@CreateMovieTitleSwagger()
	@IsString({ message: 'Title should be a string' })
	@MinLength(1, { message: 'Title cannot be empty' })
	@Length(1, 255, { message: 'Title must be between 1 and 255 characters' })
	title: string;

	@CreateMovieReleaseYearSwagger()
	@IsInt({ message: 'Release year should be a number' })
	@Min(1888, { message: 'Release year must be at least 1888' })
	@Max(new Date().getFullYear() + 1, { message: 'Release year cannot be in the future' })
	releaseYear: number;

	@CreateMovieSynopsisSwagger()
	@IsString({ message: 'Synopsis should be a string' })
	@MinLength(10, { message: 'Synopsis must be at least 10 characters long' })
	@Length(10, 2000, { message: 'Synopsis must be between 10 and 2000 characters' })
	synopsis: string;

	@CreateMovieGenreSwagger()
	@IsString({ message: 'Genre should be a string' })
	@Length(1, 100, { message: 'Genre must be between 1 and 100 characters' })
	genre?: string;

	@CreateMovieDurationSwagger()
	duration?: number;

	@CreateMovieGenresSwagger()
	genres?: string[];

	@CreateMoviePosterSwagger()
	poster?: string;
}
