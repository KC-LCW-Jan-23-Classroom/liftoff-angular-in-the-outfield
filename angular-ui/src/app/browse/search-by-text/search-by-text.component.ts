import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-by-text',
  templateUrl: './search-by-text.component.html',
  styleUrls: ['./search-by-text.component.css'],
})
export class SearchByTextComponent implements OnInit {
  searchInput!: string;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.searchService.clearResponseMovies()
    this.searchService.setSearchInput(this.searchInput);
    this.searchService.searchMoviesBySearchTerm(this.searchInput, 1);
  }
}
