import { Routes } from '@angular/router';

export const musicRoutes: Routes = [
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/music-search/music-search.component').then(
        (c) => c.MusicSearchComponent
      ),
  },
];
