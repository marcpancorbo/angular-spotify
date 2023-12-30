import { Component, Input } from '@angular/core';
import { Item } from '../../../../core/models/search-response';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent {
  @Input({ required: true }) artist: Item;
}
