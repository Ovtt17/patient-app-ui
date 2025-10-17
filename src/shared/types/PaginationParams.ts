import type { SortOrder } from "./SortOrder";

export interface PaginationParams {
  page: number;
  size: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}