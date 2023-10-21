import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApikeyService {
  private apiKey$: Observable<string>;
  private url: string = 'http://localhost:8080/api/get-api-key';

  constructor(private http: HttpClient) {
    this.apiKey$ = this.http.get<{apiKey: string}>(this.url).pipe(
      map((response) => response.apiKey)
    );
  }

  getApiKey(): Observable<string> {
    return this.apiKey$;
  }
}
