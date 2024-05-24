import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { Login } from '../../../shared/models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../../../shared/directives/blur.directive';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink, CommonModule, BlurDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginform') form: any;
  errorMessage: string = 'Some Unknown error occurred !'

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  submitForm() {
    if (this.loginForm.valid) {
      this.userService.login(<Login>this.loginForm.value).subscribe({
        next: (response: { message: string, token: string }) => {
          console.log(response);
          this.userService.setLoginToken(response.token);
          this.snackbar.open('Login Successfull !', 'Close', {
            duration: 3000
          });

          this.form.resetForm();

          setTimeout(() => {
            this.router.navigate(['/dashboard']);
            this.userService.isLogged.next(true);
          }, 1000);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          switch (error.status) {
            case 400:
              error.error.error && (this.errorMessage = error.error.error);
              break;
            case 500:
              this.errorMessage = "Some error occurred from server side !"
              break;
          }
          this.snackbar.open(this.errorMessage, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
