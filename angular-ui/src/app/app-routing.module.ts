import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserReviewComponent } from './profile/user-review/user-review.component';
import { PasswordFormComponent } from './profile/password-form/password-form.component';
import { BrowseComponent } from './browse/browse.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { MyListComponent } from './my-list/my-list.component';
<<<<<<< HEAD

=======
import { QuizComponent } from './quiz/quiz.component';
>>>>>>> 42b8302f08240094948fc71d784de235e09e96d4

const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full' },
  { path: 'browse', component: BrowseComponent },
  { path: 'user-review', component: UserReviewComponent },
  { path: 'password-form', component: PasswordFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: UserLoginComponent },
<<<<<<< HEAD
  { path: 'register', component: UserRegisterComponent },
  { path: 'my-list', component: MyListComponent},
=======
  { path: 'my-list', component: MyListComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'register', component: UserRegisterComponent },
>>>>>>> 42b8302f08240094948fc71d784de235e09e96d4
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
