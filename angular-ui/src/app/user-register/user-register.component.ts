import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  isLoggedIn = false;
  user!: User;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.popcornLogin();
    };
    onSubmit(): void {
      // this.authService.registerUser(this.user).subscribe(
      //   response => {
      //     console.log('Registration successful');
      //   },
      //   error => {
      //     console.error('Registration failed', error);
      //   }
      //);
      console.log("Click me")
      //function to direct register to submit or console log temporarily
    }
}
