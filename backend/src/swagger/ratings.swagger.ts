import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from '../common/response.dto';
import { CreateRatingDto } from '../modules/ratings/dto/create-rating.dto';

export function RatingsSwagger() {
  return applyDecorators(
    ApiTags('Ratings')
  );
}

export const CreateRatingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new rating' }),
    ApiResponse({ status: 201, description: 'Rating successfully created.', type: ApiResponseDto }),
    ApiBody({ type: CreateRatingDto })
  );

export const GetAllRatingsSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all ratings' }),
    ApiResponse({ status: 200, description: 'List of ratings.', type: ApiResponseDto })
  );

export const DeleteRatingSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a rating' }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 204, description: 'Rating deleted.', type: ApiResponseDto })
  );

export const GetRatingsByMovieIdSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get ratings by movie ID' }),
    ApiParam({ name: 'movieId', type: String }),
    ApiResponse({ status: 200, description: 'List of ratings for the movie.', type: ApiResponseDto })
  );

export function RatingsAuthHeader() {
  return ApiHeader({ name: 'Authorization', description: 'Bearer access token', required: true, example: 'Bearer <jwt>' });
} 