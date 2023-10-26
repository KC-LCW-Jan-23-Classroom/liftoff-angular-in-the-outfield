import { Component } from '@angular/core';

@Component({
  selector: 'app-search-by-text',
  templateUrl: './search-by-text.component.html',
  styleUrls: ['./search-by-text.component.css']
})
export class SearchByTextComponent {
  searchInput: string = '';

  onSubmit() {
    console.log(this.searchInput)
  }
}
