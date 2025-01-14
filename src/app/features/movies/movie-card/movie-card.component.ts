import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports:[CommonModule,RouterLink],
  template: `
    <div
    [routerLink]="['/movie', movie().id]"
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer">
      <img
         [src]="getImageUrl(movie().poster_path)"
        [alt]="movie().title"
        width="500"
        height="750"
        class="w-full h-96 object-cover"
        loading="lazy"
        [style]="{'view-transition-name': 'movie-' + movie().id}"
        priority="false"
      >
      <div class="p-4">
      <h3 class="text-xl font-bold truncate dark:text-white">{{movie().title}}</h3>
      <p class="text-gray-600 dark:text-gray-400">{{movie().release_date | date}}</p>
      <div class="flex items-center gap-2 mt-2">
        <span class="text-yellow-500">★</span>
        <span class="dark:text-gray-300">{{movie().vote_average | number:'1.1-1'}}</span>
      </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {

  private readonly movieService = inject(MovieService);
  movie = input.required<Movie>();

  getImageUrl(path: string) {
    return this.movieService.getImageUrl(path);
  }
}
