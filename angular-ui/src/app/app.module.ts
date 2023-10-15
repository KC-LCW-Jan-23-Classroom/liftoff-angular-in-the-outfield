import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component'; // Import the NavbarComponent here

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieItemComponent } from './movie-list/movie-item/movie-item.component';
import { WatchHistoryComponent } from './watch-history/watch-history.component';
import { FooterComponent } from './footer/footer.component';
import { BrowseOptionComponent } from './browse-option/browse-option.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, // Declare NavbarComponent in the declarations array
    SidebarComponent,
    MovieListComponent,
    MovieItemComponent,
    WatchHistoryComponent,
    FooterComponent,
    BrowseOptionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {};
