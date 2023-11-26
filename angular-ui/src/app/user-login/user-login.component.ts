import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  isLoggedIn = false;
  user: User = new User(0, '', '', '', '');


  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.checkLoggedIn();
    };

    onSubmit(): void {
      this.authService.loginUser(this.user).subscribe({
        next: (response: any) => {
  
          console.log(this.authService.getAuthStatusObservable());
          if (response.id) {
            console.log('Login successful');
            this.authService.setUser(response)
            this.authService.setAuthStatus(true);
            
            this.router.navigate(['/']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Registration failed', error);
        },
      });
    
    
    };
  }


