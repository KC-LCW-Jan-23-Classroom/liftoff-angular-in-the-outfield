import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  onDecadeChange(): void {
    console.log('Selected Decade:', this.selectedDecade);
    // Add logic as needed
  }

  onStreamingPlatformChange(): void {
    console.log('Selected Streaming Platform:', this.selectedStreamingPlatform);
    // Add logic as needed
  }
}
