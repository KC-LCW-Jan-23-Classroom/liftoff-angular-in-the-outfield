import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-by-text',
  templateUrl: './search-by-text.component.html',
  styleUrls: ['./search-by-text.component.css'],
})
export class SearchByTextComponent implements OnInit {
  searchInput!: string;
  searchType!: string;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.searchService.clearResponseMovies()
    this.searchService.setSearchInput(this.searchInput);
    if (this.searchType === 'person') {
      this.searchService.searchMoviesByPerson(this.searchInput);
    } else if (this.searchType === 'movie') {
      this.searchService.searchMoviesByTitle(this.searchInput, 1);
    }
  }
}
