import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { GenresService } from '../../../../core/services/genres.service';
import { take } from 'rxjs';
import { Genre } from '../../../../core/models/genre';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-genres-filter',
  standalone: true,
  imports: [JsonPipe, NzTagModule, KeyValuePipe],
  providers: [
    GenresService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GenresFilterComponent,
      multi: true,
    },
  ],
  templateUrl: './genres-filter.component.html',
  styleUrl: './genres-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresFilterComponent implements OnInit, ControlValueAccessor {
  genres: { [key: string]: { name: string; checked: boolean } } = {};
  value: string[] = [];
  disabled: boolean = false;
  _onChange: (_: any) => {};
  _onTouched: () => {};

  constructor(
    private genresService: GenresService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.genresService
      .getGenres()
      .pipe(take(1))
      .subscribe((genres: Genre[]) => {
        genres.forEach((genre: Genre) => {
          this.genres[genre.id] = {
            name: genre.name,
            checked: false,
          };
        });
        this.cdr.markForCheck();
      });
  }

  writeValue(genres: string[]): void {}
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onCheckChange(key: string) {
    this.genres[key].checked = !this.genres[key].checked;
    this.value = Object.keys(this.genres)
      .filter((genreId: string) => this.genres[genreId].checked)
      .map((genreId: string) => this.genres[genreId].name);
    this._onChange(this.value);
  }
}
