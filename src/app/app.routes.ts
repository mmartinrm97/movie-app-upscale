import { Routes } from '@angular/router';
import { MovieDashboardComponent } from './features/movies/containers/movie-dashboard/movie-dashboard.component';
import { MovieDetailComponent } from './features/movies/containers/movie-detail/movie-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MovieDashboardComponent
  },
  {
    path: 'movie/:movieId',
    component: MovieDetailComponent
  }
];
