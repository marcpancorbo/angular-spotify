import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseApiService } from '../models/base-api-service';
import { Genre } from '../models/genre';

@Injectable()
export class GenresService extends BaseApiService {
  constructor() {
    super('recommendations');
  }

  public getGenres(): Observable<Genre[]> {
    return super.get<{ genres: string[] }>('/available-genre-seeds').pipe(
      map((response) => {
        return response.genres.map((genre) => {
          const uuid = crypto.randomUUID();
          return {
            id: uuid,
            name: genre,
          };
        });
      })
    );
  }
}
