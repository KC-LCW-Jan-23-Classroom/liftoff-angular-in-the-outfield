import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../profile/edit-user-profile/edit-user-profile.component';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  currentUser: User | null;

  constructor(public authService: AuthService) {
  this.isLoggedIn= false;
this.currentUser= this.authService.getUser();
}
  

  ngOnInit(): void {
this.isLoggedIn = this.authService.getVarResponse();
this.currentUser = this.authService.getUser();
console.log(this.currentUser, "HERE NAVBAR")
this.authService.getAuthStatusObservable().subscribe((status: boolean) => {
  this.isLoggedIn = status;
});
console.log("LOOKIE")
  }
  






  // You can add more methods and console.log statements as needed
}
