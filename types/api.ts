// Generic API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  code: number;
  message: string;
}

// Pagination metadata
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Paginated response
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}