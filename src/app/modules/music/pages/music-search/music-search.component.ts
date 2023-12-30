import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
} from '@angular/core';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { Item } from '../../../../core/models/search-response';
import { SearchService } from '../../../../core/services/search.service';
import { ArtistComponent } from '../../components/artist/artist.component';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { AutoDestroyService } from '../../../../core/services/auto-destroy.service';

@Component({
  selector: 'app-music-search',
  standalone: true,
  imports: [JsonPipe, ArtistComponent, SearchFiltersComponent],
  providers: [SearchService, AutoDestroyService],
  templateUrl: './music-search.component.html',
  styleUrl: './music-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicSearchComponent implements OnInit {
  $results: Signal<Item[]> = this.searchService.$results;
  startSearching$: Subject<any> = new Subject();
  constructor(
    private searchService: SearchService,
    private destroy$: AutoDestroyService
  ) {}

  ngOnInit(): void {
    this.subscribeToSearch();
    this.startSearching$.next({ artist: '' });
  }
  subscribeToSearch(): void {
    this.startSearching$
      .pipe(
        switchMap((data: { artist: string; genre: string }) =>
          this.searchService.search({
            q: {
              artist: data.artist,
              genre: data.genre,
            },
            type: 'artist',
            limit: 30,
          })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.searchService.setSearchResults(res.artists.items);
      });
  }
}
