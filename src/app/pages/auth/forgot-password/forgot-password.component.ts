import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { MaterialModule } from '../../../shared/modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPassword } from '../../../core/models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../../../core/directives/blur.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../../../utils/constants';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule, BlurDirective],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  @ViewChild('forgotForm') form: any;
  errorMessage: string = 'Some Unknown error occurred !';
  forgotPasswordForm: any = FormGroup;


  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private elRef: ElementRef) {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.email_regex)]),
    })
  }

  submitForm() {
    if (this.forgotPasswordForm.valid) {
      this.userService.forgotPassword(<ForgotPassword>this.forgotPasswordForm.value).subscribe({
        next: (response: any) => {
          if (response) {
            this.snackbar.open('Please check your mail...', 'Close', {
              duration: 3000
            });

            this.form.resetForm();

            setTimeout(() => {
              this.userService.navigate(CONSTANTS.ROUTES.login);
            }, 3000);
          }
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

          this.elRef.nativeElement.querySelector('#email').focus();

          this.snackbar.open(this.errorMessage, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
