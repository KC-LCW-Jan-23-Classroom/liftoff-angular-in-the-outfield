import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component'; // Import the NavbarComponent here
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieItemComponent } from './movie-list/movie-item/movie-item.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { WatchHistoryComponent } from './watch-history/watch-history.component';
import { FooterComponent } from './footer/footer.component';
import { FilterOptionsComponent } from './browse/filter-options/filter-options.component';
import { TimerComponent } from './sidebar/timer/timer.component';

import { DatePipe } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { SearchByTextComponent } from './browse/search-by-text/search-by-text.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MovieListComponent,
    MovieItemComponent,
    FilterOptionsComponent,
    UserProfileComponent,
    UserReviewComponent,
    PasswordFormComponent,
    TimerComponent,
    WatchHistoryComponent,
    FooterComponent,
    BrowseComponent,
    SearchByTextComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
