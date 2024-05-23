import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MaterialModule } from '../material.module';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPassword } from '../models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../directives/blur.directive';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule, BlurDirective],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  @ViewChild('forgotForm') form: any;

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

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          }
        },
        error: (error: any) => {
          console.log(error);
          this.snackbar.open(error.message, 'Close', {
            duration: 3000
          });
        }
      });
      this.form.resetForm();
    }
  }
}
