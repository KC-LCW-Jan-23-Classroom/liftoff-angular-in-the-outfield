import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:8080/'
  // private currentUser : User;

  constructor(private http: HttpClient) { }

  fetchWatchHistory() {
    
  }


}
