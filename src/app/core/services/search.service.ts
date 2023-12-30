import { HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { BaseApiService } from '../models/base-api-service';
import { SearchRequest } from '../models/search-request';
import { Item, SearchResponse } from '../models/search-response';
import { SearchRequestFilters } from '../models/search-request-filters';

@Injectable()
export class SearchService extends BaseApiService {
  $results: WritableSignal<Item[]> = signal([]);
  $loading: WritableSignal<boolean> = signal(false);
  constructor() {
    super('search');
  }

  public search(search: SearchRequest): Observable<SearchResponse> {
    this.$loading.set(true);
    const params: HttpParams = new HttpParams({
      fromObject: {
        q: this.buildQuery(search.q),
        type: search.type,
        limit: search.limit.toString(),
      },
    });
    return super
      .get<SearchResponse>('', { params })
      .pipe(finalize(() => this.$loading.set(false)));
  }
  private buildQuery(query: SearchRequestFilters) {
    const filters = [];
    if (query.artist) {
      filters.push(`artist:${query.artist}`);
    }
    if (query.genre && query.genre.length > 0) {
      filters.push(`genre:${query.genre}`);
    }
    if (filters.length === 0) {
      return `artist:`;
    }
    return Object.values(filters).join(' ');
  }
  public setSearchResults(results: Item[]) {
    this.$results.set(results);
  }
}
