import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';

import { CommonModule } from '@angular/common';

import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent, CommonModule, PaginationComponent],
  template: `
    @if (loading()) {
      <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 dark:border-blue-400"></div>
      </div>
    } @else {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        @for (movie of movies(); track movie.id) {
          <app-movie-card [movie]="movie" />
        }
      </div>


      <app-pagination
        [currentPage]="currentPage()"
        [totalPages]="totalPages()"
        (pageChange)="pageChange.emit($event)"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  movies = input.required<Movie[]>();
  loading = input.required<boolean>();
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

}
