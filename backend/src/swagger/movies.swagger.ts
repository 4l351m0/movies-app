import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from '../common/response.dto';
import { AddActorsDto } from '../modules/movies/dto/add-actors.dto';
import { CreateMovieDto } from '../modules/movies/dto/create-movie.dto';
import { UpdateMovieDto } from '../modules/movies/dto/update-movie.dto';

export function MoviesSwagger() {
  return applyDecorators(
    ApiTags('Movies')
  );
}

export const CreateMovieSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new movie' }),
    ApiResponse({ status: 201, description: 'Movie successfully created.', type: ApiResponseDto }),
    ApiBody({ type: CreateMovieDto })
  );

export const AddActorsToMovieSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Add actors to a movie' }),
    ApiResponse({ status: 200, description: 'Actors added to the movie.', type: ApiResponseDto }),
    ApiParam({ name: 'movieId', type: String }),
    ApiBody({ type: AddActorsDto })
  );

export const GetAllMoviesSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all movies' }),
    ApiResponse({ status: 200, description: 'List of movies.', type: ApiResponseDto })
  );

export const SearchMoviesSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Search movies by text' }),
    ApiQuery({ name: 'query', type: String }),
    ApiResponse({ status: 200, description: 'Search results.', type: ApiResponseDto })
  );

export const GetMovieByIdSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a movie by ID' }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 200, description: 'Movie found.', type: ApiResponseDto }),
    ApiResponse({ status: 404, description: 'Movie not found.' })
  );

export const GetActorsInMovieSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get actors in a movie' }),
    ApiParam({ name: 'movieId', type: String }),
    ApiResponse({ status: 200, description: 'List of actors in the movie.', type: ApiResponseDto })
  );

export const UpdateMovieSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a movie' }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdateMovieDto }),
    ApiResponse({ status: 200, description: 'Movie updated.', type: ApiResponseDto })
  );

export const DeleteMovieSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a movie' }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 204, description: 'Movie deleted.', type: ApiResponseDto })
  );

export function MoviesApiKeyHeader() {
  return ApiHeader({ name: 'x-api-key', description: 'API Key', required: true, example: 'your-api-key' });
}

export function MoviesAuthHeader() {
  return ApiHeader({ name: 'Authorization', description: 'Bearer access token', required: true, example: 'Bearer <jwt>' });
} 