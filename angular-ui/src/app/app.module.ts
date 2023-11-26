import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MovieListComponent } from './browse/movie-list/movie-list.component';
import { MovieItemComponent } from './shared/movie-item/movie-item.component';
import { EditUserProfileComponent } from './profile/userprofile/edit-user-profile/edit-user-profile.component';
import { UserReviewComponent } from './profile/user-review/user-review.component';
import { PasswordFormComponent } from './profile/userprofile/password-form/password-form.component';
import { WatchHistoryComponent } from './profile/watch-history/watch-history.component';
import { FooterComponent } from './footer/footer.component';
import { FilterOptionsComponent } from './browse/filter-options/filter-options.component';
import { TimerComponent } from './sidebar/timer/timer.component';
import { BrowseComponent } from './browse/browse.component';
import { SearchByTextComponent } from './browse/search-by-text/search-by-text.component';
import { ProfileComponent } from './profile/profile.component';
import { RecommendationsComponent } from './sidebar/recommendations/recommendations.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ScrollToTopComponent } from './shared/scroll-to-top/scroll-to-top.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SavedMoviesComponent } from './saved-movies/saved-movies.component';
import { UserReviewCardComponent } from './user-review-card/user-review-card.component';
import { QuizComponent } from './quiz/quiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserprofileComponent } from './profile/userprofile/userprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MovieListComponent,
    MovieItemComponent,
    FilterOptionsComponent,
    EditUserProfileComponent,
    UserReviewComponent,
    PasswordFormComponent,
    TimerComponent,
    WatchHistoryComponent,
    FooterComponent,
    BrowseComponent,
    SearchByTextComponent,
    ProfileComponent,
    UserLoginComponent,
    UserRegisterComponent,
    RecommendationsComponent,
    ProfileViewComponent,
    ScrollToTopComponent,
    LoadingSpinnerComponent,
    SavedMoviesComponent,
    UserReviewCardComponent,
    QuizComponent,
    UserprofileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule,ReactiveFormsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
