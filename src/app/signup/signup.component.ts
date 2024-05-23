import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { SignUp } from '../models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../directives/blur.directive';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink, CommonModule, BlurDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('signupform') form: any;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

  signupForm = this.fb.group({
    userName: new FormControl('', [Validators.required]),
    contactNo: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  submitForm() {
    if (this.signupForm.valid) {
      this.userService.signUp(<SignUp>this.signupForm.value).subscribe({
        next: (response) => {
          if (response) {
            this.snackbar.open('You are successfully registered !', 'Close', {
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
      });
      this.form.resetForm();
    }
  }
}
