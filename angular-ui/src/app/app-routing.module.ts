import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserReviewComponent } from './profile/user-review/user-review.component';
import { PasswordFormComponent } from './profile/password-form/password-form.component';
import { UserProfileComponent } from './profile/edit-user-profile/edit-user-profile.component';
import { BrowseComponent } from './browse/browse.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { MyListComponent } from './my-list/my-list.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full' },
  { path: 'browse', component: BrowseComponent },
  { path: 'user-review', component: UserReviewComponent },
  { path: 'password-form', component: PasswordFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'my-list', component: MyListComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'register', component: UserRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
