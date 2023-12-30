import { Routes } from '@angular/router';
import { musicRoutes } from './modules/music/music.routes';
import { NotFoundComponent } from './core/layout/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },

  ...musicRoutes,
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
