export interface ApiResponse<T> {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: T;
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: PaginationMeta;
}

export interface ApiError {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  [key: string]: unknown;
} 