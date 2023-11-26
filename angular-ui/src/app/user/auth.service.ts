import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private varResponse: boolean;
  private authStatusSubject = new Subject<boolean>();
  private registerUrl = 'http://localhost:8080/auth/register';
  private authUrl = 'http://localhost:8080/auth/login';
  private userUrl = 'http://localhost:8080/users';
  private logoutUrl = 'http://localhost:8080/auth/logout';
  private profileUrl = 'http://localhost:8080/users/profile';
  updateUser: any;

  constructor(private http: HttpClient) {
    this.varResponse = false;
    this.user = new User(0, '', '', '', '');
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

  loginUser(user: any): Observable<any> {
    return this.http.post(this.authUrl, user);
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
  }

  getVarResponse(): boolean {
    return this.varResponse;
  }

  setVarResponse(setWith: boolean): void {
    this.varResponse = setWith;
  }

  checkLoggedIn(): Observable<boolean> {
    const url = this.varResponse ? this.authUrl : this.registerUrl;
    return this.http.get<boolean>(url);
  }

  popcornLogin(): void {
    this.loginUser(this.user).subscribe({
      next: (response: boolean) => {
        this.varResponse = response;
        console.log('LoginCheck here');
      },
      error: (error: any) => {
        console.error('Error checking login:', error);
      }
    });
  }

  updateUserInformation(user: User): Observable<any> {
    const url = this.varResponse ? this.userUrl : this.updateUser;
    return this.http.put(url, user);
  }

  logout(): Observable<any> {
    if (this.varResponse) {
      this.logoutUrl = 'http://localhost:8080/auth/logout';
    }
    return this.http.post<any>(this.logoutUrl, null);
  }

  editProfile(user: User): Observable<any> {
    if (this.varResponse) {
      this.profileUrl = 'http://localhost:8080/users/profile';
    }
    return this.http.patch<any>(this.profileUrl, user);
  }
}
