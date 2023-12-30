import { Component, EventEmitter, OnInit, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AutoDestroyService } from '../../../../core/services/auto-destroy.service';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  merge,
  takeUntil,
} from 'rxjs';
import { GenresFilterComponent } from '../genres-filter/genres-filter.component';
import { SearchService } from '../../../../core/services/search.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [NzInputModule, NzIconModule, ReactiveFormsModule, GenresFilterComponent],
  providers: [AutoDestroyService],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss',
})
export class SearchFiltersComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter();
  $loading: Signal<boolean> = this.searchService.$loading;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private destroy$: AutoDestroyService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.form = this.fb.group({
      artist: [''],
      genre: [[]],
    });
    this.subscribeToFormChanges();
  }
  subscribeToFormChanges(): void {
    merge(this.subscribeToArtistChanges(), this.subscribeToGenresChanges())
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.startSearching());
  }
  subscribeToArtistChanges(): Observable<string> {
    return this.form.controls['artist'].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );
  }
  subscribeToGenresChanges(): Observable<string[]> {
    return this.form.controls['genre'].valueChanges.pipe(
      takeUntil(this.destroy$)
    );
  }
  startSearching(): void {
    const artist = this.form.controls['artist'].value;
    const genre = this.form.controls['genre'].value;
    this.search.emit({ artist, genre });
  }
}
