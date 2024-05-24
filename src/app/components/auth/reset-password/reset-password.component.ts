import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlurDirective } from '../../../shared/directives/blur.directive';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPassword } from '../../../shared/models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule, BlurDirective],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  @ViewChild('resetForm') form: any;
  errorMessage: string = 'Some Unknown error occurred !'
  resetToken = this.currentRoute.snapshot.paramMap.get('token');

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router, private currentRoute: ActivatedRoute) {
  }

  resetPasswordForm = this.fb.group({
    new_password: new FormControl<string>('', [Validators.required])
  })

  submitForm() {
    if (this.resetPasswordForm.valid) {
      this.userService.resetPassword(<ResetPassword>this.resetPasswordForm.value, this.resetToken!).subscribe({
        next: (response) => {
          console.log(response);
          if (response) {
            this.snackbar.open('Your Password has been changed successfully', 'Close', {
              duration: 3000
            });

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          switch (error.status) {
            case 401:
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
      })
      this.form.resetForm();
    }
  }
}