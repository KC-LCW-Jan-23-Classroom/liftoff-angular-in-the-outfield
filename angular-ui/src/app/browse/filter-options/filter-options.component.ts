import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/shared/genre.model';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css'],
})
export class FilterOptionsComponent implements OnInit {
  genres: Genre[] = [];
  decades: number[] = [];
  streamingPlatforms: string[] = [];
  selectedGenre: string = '';
  selectedDecade: number = 0; // Change type to number, or use string if appropriate
  selectedStreamingPlatform: string = '';
  backendService: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchDecades();
    this.fetchStreamingPlatforms();
  }

  fetchGenres(): void {
    this.http
      .get<Genre[]>('http://localhost:8080/api/filter-options/genres')
      .subscribe(
        (data: Genre[]) => {
          this.genres = data;
        },
        (error: any) => {
          console.error('Error fetching genres:', error);
        }
      );
  }

  fetchDecades(): void {
    this.http
      .get<number[]>('http://localhost:8080/api/filter-options/decades')
      .subscribe(
        (data) => {
          this.decades = data;
        },
        (error) => {
          console.error('Error fetching decades:', error);
        }
      );
  }

  fetchStreamingPlatforms(): void {
    this.http
      .get<string[]>(
        'http://localhost:8080/api/filter-options/streaming-platforms'
      )
      .subscribe(
        (data) => {
          this.streamingPlatforms = data;
        },
        (error) => {
          console.error('Error fetching streaming platforms:', error);
        }
      );
  }

  onGenreChange(): void {
    console.log('Selected Genre:', this.selectedGenre);
    // Add logic as needed
  }
  onSubmit() {
    if (this.selectedGenre) {
      const url = 'http://localhost:8080/api/filter-options/movies-by-genre';
      this.http.post<any>(url, { genre: this.selectedGenre }).subscribe(
        (response) => {
          // Handle response from backend if needed
          console.log('Response from backend:', response);
        },
        (error) => {
          // Handle errors if any
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Please select a genre.');
    }
  }

  sendGenreToBackend(genre: string): Observable<any> {
    const url = 'https://api.themoviedb.org/3/discover/movie'; // Replace with your backend API endpoint
    return this.http.post<any>(url, { genre });
  }
}
