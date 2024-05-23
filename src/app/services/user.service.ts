import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ForgotPassword, Login, ResetPassword, SignUp } from '../models/auth.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  signUp(userData: SignUp) {
    return this.http.post(this.url, userData);
  }

  login(userData: Login) {
    return this.http.post(this.url, userData);
  }

  forgotPassword(userData: ForgotPassword) {
    return this.http.post(this.url, userData);
  }

  resetPassword(userData: ResetPassword){
    // return this.http.post(this.url, userData);
    return of(true);
  }
}
