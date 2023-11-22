import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.css'],
})
export class FilterOptionsComponent implements OnInit {
  genres: string[] = [];
  selectedGenre: string = ''; // Declare the property here
  decades: number[] = [];
  streamingPlatforms: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<string[]>('http://localhost:8080/api/filter-options/genres')
      .subscribe((data) => {
        this.genres = data;
      }),
      (error: any) => {
        console.error('Error fetching genres:', error);
      };

    this.http
      .get<number[]>('http://localhost:8080/api/filter-options/decades')
      .subscribe((data) => {
        this.decades = data;
      });

    this.http
      .get<string[]>(
        'http://localhost:8080/api/filter-options/streaming-platforms'
      )
      .subscribe((data) => {
        this.streamingPlatforms = data;
      });
  }

  onGenreChange(): void {
    // You can access the selected genre using this.selectedGenre
    console.log('Selected Genre:', this.selectedGenre);
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-filter-options',
//   templateUrl: './filter-options.component.html',
//   styleUrls: ['./filter-options.component.css']
// })
// export class FilterOptionsComponent {

// }
