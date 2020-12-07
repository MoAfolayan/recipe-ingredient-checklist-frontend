import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    return this.http.get<User>(environment['apiBaseUrl'] + '/user');
  }
}
