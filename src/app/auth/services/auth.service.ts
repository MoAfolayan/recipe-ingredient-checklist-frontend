import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject(false);

  private token: string = null;

  constructor(
    private http: HttpClient,
  ) {
    this.resolveToken();
  }

  private setTokenInfo(data): void {
    this.token = data['token'];
    localStorage.setItem('token', this.token);
  }

  private resolveToken(): boolean {
    this.token = localStorage.getItem('token');
    this.isLoggedIn.next(this.token ? true : false);
    return this.token ? true : false;
  }

  getToken(): string {
    return this.token;
  }

  hasToken(): boolean {
    return this.getToken() ? true : false;
  }

  logout(): boolean {
    this.clearData();

    this.isLoggedIn.next(false);
    return true;
  }

  async login({ username, password }): Promise<any> {
    this.clearData();

    const loginData = {
      'username': username,
      'password': password
    };

    const token = await this.http.post(environment['apiBaseUrl'] + '/authenticate/login', loginData).toPromise();

    if (token['token']) {
      this.setTokenInfo(token);
      this.isLoggedIn.next(true);
      return true;
    } else {
      return false;
    }
  }

  private clearData(): void {
    this.token = null;
    localStorage.clear();
  }

}
