import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../material.module';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlurDirective } from '../directives/blur.directive';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPassword } from '../models/auth.model';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule, BlurDirective],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  @ViewChild('resetForm') form: any;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) {
  }

  resetPasswordForm = this.fb.group({
    newPassword: new FormControl<string>('', [Validators.required])
  })

  submitForm() {
    if (this.resetPasswordForm.valid) {
      this.userService.resetPassword(<ResetPassword>this.resetPasswordForm.value).subscribe({
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
        error: (error) => {
          console.log(error);
          this.snackbar.open(error.message, 'Close', {
            duration: 3000
          });
        }
      })
      this.form.resetForm();
    }
  }
}
