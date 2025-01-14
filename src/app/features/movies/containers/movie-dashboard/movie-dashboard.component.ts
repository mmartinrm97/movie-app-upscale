import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie.interface';
import { MovieFiltersComponent } from "../../components/movie-filters/movie-filters.component";
import { MovieListComponent } from "../../components/movie-list/movie-list.component";

@Component({
  selector: 'app-movie-dashboard',
  imports: [MovieFiltersComponent, MovieListComponent, ],
  template: `
    <div class="container mx-auto p-4">
        <app-movie-filters
            (searchChange)="onSearchChange($event)"
          />
          <app-movie-list
            [movies]="movies()"
            [loading]="loading()"
            [currentPage]="currentPage()"
                [totalPages]="totalPages()"
                (pageChange)="onPageChange($event)"
          />
      </div>

`,
  styleUrl: './movie-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDashboardComponent implements OnInit {

  private readonly movieService = inject(MovieService);

  movies = signal<Movie[]>([]);
  private readonly searchQuery = signal('');
  loading = signal(true);
  currentPage = signal(1);
  totalPages = signal(1);

  ngOnInit() {
    this.loadMovies();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadMovies();
  }

  private loadMovies() {
    this.loading.set(true);
    const query = this.searchQuery();

    const request$ = query
      ? this.movieService.searchMovies(query, this.currentPage())
      : this.movieService.getNowPlaying(this.currentPage());

    request$.subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.totalPages.set(response.total_pages);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1);
    this.loadMovies();
  }

 }
