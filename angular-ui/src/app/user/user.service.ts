import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private apiUrl = 'http://localhost:8080/auth'; // Assuming your Spring Boot app runs on port 8080

  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/login`);
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, newUser);
  }
}