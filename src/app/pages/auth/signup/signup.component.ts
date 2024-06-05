import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { SignUp } from '../../../core/models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../../../core/directives/blur.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../../../utils/constants';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink, CommonModule, BlurDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('signupform') formRef!: NgForm;
  errorMessage: string = 'Some Unknown error occurred !';
  signupForm: any = FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar, private router: Router) {
    this.signupForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.name_regex)]),
      contactNumber: new FormControl('', [Validators.required, Validators.email, Validators.pattern(CONSTANTS.REGEX.contact_number_regex)]),
      email: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.email_regex)]),
      password: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.password_regex)]),
    })
  }


  submitForm() {
    if (this.signupForm.valid) {
      this.userService.signUp(<SignUp>this.signupForm.value).subscribe({
        next: (response) => {
          if (response) {
            this.snackbar.open('You are successfully registered !', 'Close', {
              duration: 3000
            });

            this.formRef.resetForm();

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
