import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserProfileService {
  private apiUrl = 'http://localhost:8080/api/users';
  // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`); // GET request to fetch user profile
  }

  updateUserProfile(updatedProfile: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, updatedProfile); // PUT request to update user profile
  }
}
