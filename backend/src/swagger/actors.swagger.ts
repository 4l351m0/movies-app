import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseDto } from '../common/response.dto';
import { CreateActorDto } from '../modules/actors/dto/create-actor.dto';
import { UpdateActorDto } from '../modules/actors/dto/update-actor.dto';

export function ActorsSwagger() {
  return applyDecorators(
    ApiTags('Actors')
  );
}

export const CreateActorSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new actor' }),
    ApiResponse({ status: 201, description: 'Actor successfully created.', type: ApiResponseDto }),
    ApiBody({ type: CreateActorDto })
  );

export const GetAllActorsSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all actors' }),
    ApiResponse({ status: 200, description: 'List of actors.', type: ApiResponseDto })
  );

export const SearchActorsSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Search actors by text' }),
    ApiQuery({ name: 'query', type: String }),
    ApiResponse({ status: 200, description: 'Search results.', type: ApiResponseDto })
  );

export const GetActorByIdSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get an actor by ID' }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 200, description: 'Actor found.', type: ApiResponseDto }),
    ApiResponse({ status: 404, description: 'Actor not found.' })
  );

export const GetMoviesByActorSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get movies by actor ID' }),
    ApiParam({ name: 'actorId', type: String }),
    ApiResponse({ status: 200, description: 'List of movies for the actor.', type: ApiResponseDto })
  );

export const UpdateActorSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update an actor' }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdateActorDto }),
    ApiResponse({ status: 200, description: 'Actor updated.', type: ApiResponseDto })
  );

export const DeleteActorSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete an actor' }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 204, description: 'Actor deleted.', type: ApiResponseDto })
  );

export function ActorsApiKeyHeader() {
  return ApiHeader({ name: 'x-api-key', description: 'API Key', required: true, example: 'your-api-key' });
}

export function ActorsAuthHeader() {
  return ApiHeader({ name: 'Authorization', description: 'Bearer access token', required: true, example: 'Bearer <jwt>' });
} 