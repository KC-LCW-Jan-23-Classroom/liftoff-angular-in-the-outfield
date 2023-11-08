import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private varResponse:boolean;

  constructor(private http: HttpClient) { 
    this.varResponse = false;
  }

//insert the actual API endpoint for user authentication in java here
  private authUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';



  
  

    checkLoggedIn(): Observable<boolean> {
      if (this.varResponse) {
        // If the user is logged in, return an observable for login status.
        return this.http.get<boolean>(this.authUrl);
      } else {
        // If the user is not logged in, return an observable for registration status.
        return this.http.get<boolean>(this.registerUrl);
      }
    }

  public popcornLogin(): void {
    this.checkLoggedIn().subscribe({
      next:(response:boolean) => {
       this.varResponse = response;
      },
      error: (error: any) => {
        console.error('Error checking login:', error);
      }
    });

}
}
