import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ForgotPassword, Login, ResetPassword, SignUp } from '../models/auth.model';
import { CONSTANTS } from '../../utils/constants';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiURL;
  isLogged = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  signUp(userData: SignUp) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "user/register", userData, {
      headers
    });
  }

  login(userData: Login) {
    return this.http.post<{ message: string, token: string }>(this.url + CONSTANTS.url.login, userData);
  }

  // public isAuthenticated(): boolean {
  //   let token = localStorage.getItem(CONSTANTS.auth.AUTH_TOKEN);
  //   if(token){
  //     return true;
  //   }
  //   else{
  //     this.router.navigate(['/']);
  //     return false;
  //   }
  // }

  logout() {
    localStorage.removeItem(CONSTANTS.auth.AUTH_TOKEN);
    this.isLogged.next(false);
    this.router.navigate(['/login']);
  }

  forgotPassword(userData: ForgotPassword) {
    return this.http.post(this.url + CONSTANTS.url.forgot_password, userData);
  }

  resetPassword(userData: ResetPassword, resetToken: string) {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + resetToken, 'Content-Type': 'application/json' });
    return this.http.patch(this.url + CONSTANTS.url.reset_password, userData, {
      headers
    });
  }

  checkToken(token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{ message: boolean }>(this.url + CONSTANTS.url.check_token + token, {
      headers
    });
  }

  setLoginToken(token: string) {
    localStorage.setItem(CONSTANTS.auth.AUTH_TOKEN, token);
  }

  getLoginToken() {
    return localStorage.getItem(CONSTANTS.auth.AUTH_TOKEN);
  }
}