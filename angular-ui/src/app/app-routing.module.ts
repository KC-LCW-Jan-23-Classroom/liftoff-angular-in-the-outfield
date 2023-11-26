import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserReviewComponent } from './profile/user-review/user-review.component';
import { PasswordFormComponent } from './profile/userprofile/password-form/password-form.component';
import { BrowseComponent } from './browse/browse.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { MyListComponent } from './my-list/my-list.component';
import { QuizComponent } from './quiz/quiz.component';
import { EditUserProfileComponent } from './profile/userprofile/edit-user-profile/edit-user-profile.component';
import { UserprofileComponent } from './profile/userprofile/userprofile.component';


const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full' },
  { path: 'browse', component: BrowseComponent },
  { path: 'user-review', component: UserReviewComponent },
  { path: 'password-form', component: PasswordFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'my-list', component: MyListComponent},
  { path: 'quiz', component: QuizComponent },
  { path: 'edit-user-profile', component: EditUserProfileComponent},
  { path: 'userprofile', component: UserprofileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],

})
export class AppRoutingModule {}
