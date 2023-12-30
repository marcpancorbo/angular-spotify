import { SearchRequestFilters } from './search-request-filters';

export interface SearchRequest {
  q: SearchRequestFilters;
  type: string;
  limit: number;
}
