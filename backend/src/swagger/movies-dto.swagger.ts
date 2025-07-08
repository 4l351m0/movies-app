import { ApiProperty } from '@nestjs/swagger';

export const CreateMovieTitleSwagger = () => ApiProperty({ description: 'Name or Title of the movie', example: 'Pulp Fiction' });
export const CreateMovieReleaseYearSwagger = () => ApiProperty({ description: 'Release year of the movie', example: 1994 });
export const CreateMovieSynopsisSwagger = () => ApiProperty({ description: 'Synopsis or short description', example: 'This is the synopsis of the movie' });

export const AddActorsActorsIdSwagger = () => ApiProperty({ description: 'Array of actor IDs to add to the movie', type: [String], example: ['uuid-actor-1', 'uuid-actor-2'] }); 