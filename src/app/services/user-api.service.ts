import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(
    protected http: HttpClient,
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
