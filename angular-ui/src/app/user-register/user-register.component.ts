import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';





@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  isLoggedIn = false;
  user: User = new User(0, '', '', '', '');
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router){
    
  }

  ngOnInit(): void {
    this.authService.popcornLogin();
    };

    onSubmit(): void {
      this.authService.registerUser(this.user).subscribe({
        next: (response: any) => {
          console.log('Registration successful');
          if (response.id) {
            this.router.navigate(['/login']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Registration failed', error);
          if (error.error && error.error.error) {
            // Display the error message to the user
            this.errorMessage = error.error.error;
          }
        },
      });
      
      
    }
}
