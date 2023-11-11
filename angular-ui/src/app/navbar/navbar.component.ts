import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../profile/edit-user-profile/edit-user-profile.component';
import { AuthService } from '../user/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

//get the logged in variable data into here somehow .. 
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = true;
  }
  

  ngOnInit(): void {
    console.log('Navbar Component initialized');
    this.authService.checkLoggedIn().subscribe((response: boolean) => {
      this.isLoggedIn = response;
    });
  }
  
  


  // You can add more methods and console.log statements as needed
}
