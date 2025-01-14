import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponse } from '../interfaces/movie.interface';
import { MovieDetail } from '../interfaces/movie-detail.interface';
import { MovieImageSize } from '../interfaces/movie-image-size..type';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);

  getNowPlaying(page: number = 1, language: string = 'en-US', region?: string): Observable<APIResponse> {
    const params = {
      language,
      page,
      ...(region && { region })
    };

    return this.http.get<APIResponse>('/movie/now_playing', { params });
  }
  getMoviesByGenre(genreId: number, page: number = 1): Observable<APIResponse> {
    return this.http.get<APIResponse>('/discover/movie', {
      params: {
        with_genres: genreId.toString(),
        page: page.toString()
      }
    });
  }

  searchMovies(query: string, page: number = 1): Observable<APIResponse> {
    return this.http.get<APIResponse>('/search/movie', {
      params: {
        query,
        page: page.toString()
      }
    });
  }

  getImageUrl(path: string, size: MovieImageSize = 'w500'): string {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  getMovieDetail(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`/movie/${id}`, {
      params: {
        language: 'en-US'
      }
    });
  }
}
