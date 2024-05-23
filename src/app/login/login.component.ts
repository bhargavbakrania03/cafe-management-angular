import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Login } from '../models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../directives/blur.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink, CommonModule, BlurDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginform') form: any;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) { }

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  submitForm() {
    if (this.loginForm.valid) {
      this.userService.login(<Login>this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response)
          this.snackbar.open('Login Successfull !', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/dashboard']);
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
