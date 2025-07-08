import { ApiProperty } from '@nestjs/swagger';

export const CreateRatingValueSwagger = () => ApiProperty({ description: 'Rating value of the movie (1-5)', example: 4 });
export const CreateRatingMovieIdSwagger = () => ApiProperty({ description: "Movie's ID which allows the rating" }); 