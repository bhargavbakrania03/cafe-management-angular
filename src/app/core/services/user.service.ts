import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChangePassword, ForgotPassword, Login, ResetPassword, SignUp, User } from '../models/auth.model';
import { CONSTANTS } from '../../utils/constants';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiURL;
  toggleSidebar = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  signUp(userData: SignUp) {
    return this.http.post<{ message: string, user: User }>(this.url + CONSTANTS.API_URL.AUTH.sign_up, userData, {
      headers: CONSTANTS.HEADERS.content_json
    });
  }

  login(userData: Login) {
    return this.http.post<{ message: string, token: string }>(this.url + CONSTANTS.API_URL.AUTH.login, userData);
  }

  // public isAuthenticated(): boolean {
  //   let token = userService.getLoginToken();
  //   if (token) {
  //     return true;
  //   }
  //   else {
  //     this.router.navigate(['/']);
  //     return false;
  //   }
  // }

  logout() {
    localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
    this.navigate(CONSTANTS.ROUTES.login);
  }

  forgotPassword(userData: ForgotPassword) {
    return this.http.post<{ message: string }>(this.url + CONSTANTS.API_URL.AUTH.forgot_password, userData);
  }

  resetPassword(userData: ResetPassword, resetToken: string) {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + resetToken, 'Content-Type': 'application/json' });
    return this.http.patch<{ message: string }>(this.url + CONSTANTS.API_URL.RESET_PASSWORD.reset_password, userData, {
      headers
    });
  }

  changePassword(userData: ChangePassword) {
    return this.http.patch<{ message: string }>(this.url + CONSTANTS.API_URL.AUTH.change_password, userData, {
      headers: CONSTANTS.HEADERS.content_json
    });
  }

  checkResetToken(token: string) {
    return this.http.get<{ message: boolean }>(this.url + CONSTANTS.API_URL.RESET_PASSWORD.check_token + token, {
      headers: CONSTANTS.HEADERS.content_json
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

  // In Manage Users State
  getUsers() {
    return this.http.get<{users: UserResponse[]}>(this.url + CONSTANTS.API_URL.USER.get_user);
  }

  updateUser(id: number) {
    return this.http.patch<{message: string}>(this.url + CONSTANTS.API_URL.USER.update_user + id, {
      headers: CONSTANTS.HEADERS.content_json
    });
  }
}