import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { User } from './user';
import { NavbarComponent } from '../navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private varResponse:boolean;
  private authStatusSubject = new Subject<boolean>();
  private registerUrl = 'http://localhost:8080/auth/register';
  private authUrl = 'http://localhost:8080/auth/login';
  private tokenKey = 'authToken'; // Added tokenKey


  constructor(private http: HttpClient) { 
    this.varResponse = false;
    this.user = new User(0, "", "", "", "");
  }

getAuthStatusObservable(): Observable<boolean> {
  return this.authStatusSubject.asObservable();
}

setAuthStatus(status: boolean) {
  this.authStatusSubject.next(status);
}

  registerUser(user: any): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  loginUser(user: any): Observable<any>{
    return this.http.post(this.authUrl, user)
  }


  getUser():User{
   return this.user;
  }

  setUser(user: User): void{
    this.user = user
  }


getVarResponse(){
  return this.varResponse;
}
  setVarResponse(setWith:boolean){
    this.varResponse = setWith;
  }

 // New method to check if the user is authenticated
 isAuthenticated(): boolean {
  const token = localStorage.getItem(this.tokenKey);
  return !!token;
}

// Logout method
logout(): void {
  localStorage.removeItem(this.tokenKey);
  // Clear other user-related data if needed
}
  
  

    checkLoggedIn(): Observable<boolean> {
      const token = localStorage.getItem(this.tokenKey);
      if (token) {
        // If the token exists, the user is considered logged in
        return of(true);
      } else {
        // If the token doesn't exist, the user is considered not logged in
        return of(false);
      }
      // if (this.varResponse) {
      //   // If the user is logged in, return an observable for login status.
      //   return this.http.get<boolean>(this.authUrl);
      // } else {
      //   // If the user is not logged in, return an observable for registration status.
      //   return this.http.get<boolean>(this.registerUrl);
      // }
    }

  public popcornLogin(): void {
    this.loginUser(this.user).subscribe({
      next:(response:boolean) => {
       this.varResponse = response;
       this.setAuthStatus(response); // Set the authentication status

       console.log("LoginCheck here")
      },
      error: (error: any) => {
        console.error('Error checking login:', error);
      }
    });

}
}
