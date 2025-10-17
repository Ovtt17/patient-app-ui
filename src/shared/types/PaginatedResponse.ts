export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  totalPages: number;
  totalElements: number;
}