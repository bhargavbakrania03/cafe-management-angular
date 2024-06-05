import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Login } from '../../../core/models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../../../core/directives/blur.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../../../utils/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink, CommonModule, BlurDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string = 'Some Unknown error occurred !';
  @ViewChild('loginform') formRef!: NgForm;
  loginForm: any = FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router, private elRef: ElementRef) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(CONSTANTS.REGEX.email_regex)]),
      password: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.password_regex)]),
    })
  }


  submitForm() {
    if (this.loginForm.valid) {
      this.userService.login(<Login>this.loginForm.value).subscribe({
        next: (response: { message: string, token: string }) => {
          this.userService.setLoginToken(response.token);
          this.snackbar.open('Login Successfull !', 'Close', {
            duration: 3000
          });

          this.formRef.resetForm();
          this.router.navigate(['/cafe/dashboard']);
          this.userService.isLogged.next(true);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          switch (error.status) {
            case 400:
              error.error.error && (this.errorMessage = error.error.error);
              error.error.message && (this.errorMessage = error.error.message);
              break;
            case 500:
              this.errorMessage = "Some error occurred from server side !"
              break;
          }
          if (this.errorMessage.toLowerCase().includes('password')) {
            this.elRef.nativeElement.querySelector(`#password`).focus();
          }
          if (this.errorMessage.toLowerCase().includes('email')) {
            this.elRef.nativeElement.querySelector(`#email`).focus();
          }
          this.snackbar.open(this.errorMessage, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
