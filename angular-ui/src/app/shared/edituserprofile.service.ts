import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class EditUserProfileService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<User> {
    // Implement logic to fetch user profile by ID from your API
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<User>(url);
  }

  updateUserProfile(userId: string, updatedProfile: User): Observable<User> {

    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<User>(url, updatedProfile);
  }
}
