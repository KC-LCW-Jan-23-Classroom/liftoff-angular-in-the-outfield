import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.popcornLogin();
    };
  }


