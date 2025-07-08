import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDataSwagger, ApiResponseMessageSwagger, ApiResponsePathSwagger, ApiResponseStatusCodeSwagger, ApiResponseTimestampSwagger } from '../swagger/response-dto.swagger';

export class ApiResponseDto<T> {
  @ApiResponseStatusCodeSwagger()
  statusCode: number;

  @ApiResponseTimestampSwagger()
  timestamp: string;

  @ApiResponsePathSwagger()
  path: string;

  @ApiResponseMessageSwagger()
  message: string;

  @ApiResponseDataSwagger()
  data: T;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 100 })
  totalItems: number;

  @ApiProperty({ example: 20 })
  itemCount: number;

  @ApiProperty({ example: 20 })
  itemsPerPage: number;

  @ApiProperty({ example: 5 })
  totalPages: number;

  @ApiProperty({ example: 1 })
  currentPage: number;
}

export class PaginatedResponseDto<T> extends ApiResponseDto<T> {
  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;
}
