import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.popcornLogin();
    };
}
