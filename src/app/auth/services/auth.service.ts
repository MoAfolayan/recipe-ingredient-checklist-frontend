import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject(false);

  private token: string  = null;
  private userLoginData: LoginModel = null;

  constructor(
    private http: HttpClient,
  ) {
    this.resolveToken();
  }
  
  resolveToken(): boolean {
    this.token = localStorage.getItem('token');
    this.isLoggedIn.next(this.token ?  true : false);
    return this.token ? true : false;
  }

  getToken(): string {
    return this.token;
  }

  hasToken(): boolean  {
    return this.getToken() ? true : false;
  }

  async logout() {
    this.clearData();

    this.isLoggedIn.next(false);
    return true;
  }

  async login({ username, password }): Promise<any>  {

    this.clearData();

    const loginData  = {
      'username' : username,
      'password' : password
    };

    const data  = await this.http.post(environment['apiBaseUrl'] + '/authenticate/login' , loginData).toPromise();

    if (data['token']) {
      this.setTokenInfo(data);
      this.isLoggedIn.next(true);
      return true;
    } else {
      return false;
    }
  }

  clearData() {
    this.userLoginData  = null;
    this.token  = null;
    localStorage.clear();
  }

  getUserData(): LoginModel {
    return this.userLoginData;
  }

  private setTokenInfo(data) {
    this.token  = data['token'];
    localStorage.setItem('token' , this.token);
  }
}
