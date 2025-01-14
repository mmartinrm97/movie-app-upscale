import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { MovieImageSize } from '../../interfaces/movie-image-size..type';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports:[CommonModule],
  template: `
    @if (movie(); as movie) {
      <div class="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
        <button
          (click)="goBack()"
          class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back
        </button>

        <div class="relative">
          <img
            [src]="getImageUrl(movie.backdrop_path, 'original')"
            [alt]="movie.title"
            priority
            class="w-full h-[60vh] object-cover rounded-xl"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-1">
            <img
              [src]="getImageUrl(movie.poster_path)"
              [alt]="movie.title"
              class="w-full h-auto rounded-xl shadow-lg dark:shadow-gray-800"
              [style]="{'view-transition-name': 'movie-' + movie.id}"
            >
          </div>

          <div class="md:col-span-2">
            <h1 class="text-4xl font-bold mb-4 dark:text-white">{{movie.title}}</h1>
            <p class="text-gray-400 dark:text-gray-300 mb-4">{{movie.tagline}}</p>

            <div class="flex gap-2 mb-4">
              @for (genre of movie.genres; track genre.id) {
                <span class="px-3 py-1 bg-gray-800 dark:bg-gray-700 rounded-full text-sm text-white">
                  {{genre.name}}
                </span>
              }
            </div>

            <p class="text-lg mb-4 dark:text-gray-200">{{movie.overview}}</p>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-gray-400 dark:text-gray-500">Release Date</p>
                <p class="dark:text-gray-200">{{movie.release_date | date}}</p>
              </div>
              <div>
                <p class="text-gray-400 dark:text-gray-500">Runtime</p>
                <p class="dark:text-gray-200">{{movie.runtime}} minutes</p>
              </div>
              <div>
                <p class="text-gray-400 dark:text-gray-500">Budget</p>
                <p class="dark:text-gray-200">{{movie.budget | currency}}</p>
              </div>
              <div>
                <p class="text-gray-400 dark:text-gray-500">Revenue</p>
                <p class="dark:text-gray-200">{{movie.revenue | currency}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent {
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute)
  private readonly location = inject(Location);

  @Input() movieId!: string;


  movie = toSignal(
    this.route.params.pipe(
      switchMap(({movieId}) => this.movieService.getMovieDetail(movieId)),
    )
  )

  getImageUrl(path: string, size: MovieImageSize = 'original') {
    return this.movieService.getImageUrl(path,size);
  }

  goBack() {
    this.location.back();
  }


}
