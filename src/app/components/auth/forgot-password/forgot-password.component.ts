import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { MaterialModule } from '../../../material.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPassword } from '../../../shared/models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../../../shared/directives/blur.directive';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule, BlurDirective],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  @ViewChild('forgotForm') form: any;
  errorMessage: string = 'Some Unknown error occurred !'

  forgotPasswordForm = this.fb.group({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  })

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) {
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
              this.router.navigate(['/login']);
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
          this.snackbar.open(this.errorMessage, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
