import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChangePassword, ForgotPassword, Login, ResetPassword, SignUp } from '../models/auth.model';
import { CONSTANTS } from '../../utils/constants';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiURL;
  isLogged = new Subject<boolean>();
  toggleSidebar = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  signUp(userData: SignUp) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + CONSTANTS.API_URL.AUTH.sign_up, userData, {
      headers
    });
  }

  login(userData: Login) {
    return this.http.post<{ message: string, token: string }>(this.url + CONSTANTS.API_URL.AUTH.login, userData);
  }

  public isAuthenticated(): boolean {
    let token = localStorage.getItem(CONSTANTS.AUTH_TOKEN);
    if (token) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }

  logout() {
    localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
    this.isLogged.next(false);
    this.router.navigate(['/login']);
    this.navigate(CONSTANTS.ROUTES.login);
  }

  forgotPassword(userData: ForgotPassword) {
    return this.http.post(this.url + CONSTANTS.API_URL.AUTH.forgot_password, userData);
  }

  resetPassword(userData: ResetPassword, resetToken: string) {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + resetToken, 'Content-Type': 'application/json' });
    return this.http.patch(this.url + CONSTANTS.API_URL.RESET_PASSWORD.reset_password, userData, {
      headers
    });
  }

  changePassword(userData: ChangePassword) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.patch(this.url + CONSTANTS.API_URL.AUTH.change_password, userData, {
      headers
    });
  }

  checkResetToken(token: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<{ message: boolean }>(this.url + CONSTANTS.API_URL.RESET_PASSWORD.check_token + token, {
      headers
    });
  }

  setLoginToken(token: string) {
    localStorage.setItem(CONSTANTS.AUTH_TOKEN, token);
  }

  getLoginToken() {
    return localStorage.getItem(CONSTANTS.AUTH_TOKEN);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}