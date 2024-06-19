import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { SignUp } from '../../../core/models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlurDirective } from '../../../core/directives/blur.directive';
import { CONSTANTS } from '../../../utils/constants';
import { Store } from '@ngrx/store';
import { AuthFeature } from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink, CommonModule, BlurDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('signupform') formRef!: NgForm;
  signupForm: any = FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private store: Store) {
    this.signupForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.name_regex)]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.contact_number_regex)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(CONSTANTS.REGEX.email_regex)]),
      password: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.password_regex)]),
    })
  }

  submitForm() {
    this.store.dispatch(AuthActions.SignupStart({ signupData: <SignUp>this.signupForm.value }))

    this.store.select(AuthFeature.selectMessage).subscribe(response => {
      if (response !== '') {
        this.formRef.resetForm()
        this.userService.navigate('/login')
      }
    })

    // if (this.signupForm.valid) {
    //   this.userService.signUp(<SignUp>this.signupForm.value).subscribe({
    //     next: (response) => {
    //       if (response) {
    //         this.snackbar.open('You are successfully registered !', 'Close', {
    //           duration: 3000
    //         });

    //         this.formRef.resetForm();

    //         setTimeout(() => {
    //           this.router.navigate(['/login']);
    //         }, 3000);
    //       }
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       console.log(error);
    //       switch (error.status) {
    //         case 400:
    //           error.error.error && (this.errorMessage = error.error.error);
    //           break;
    //         case 500:
    //           this.errorMessage = "Some error occurred from server side !"
    //           break;
    //       }

    //       this.snackbar.open(this.errorMessage, 'Close', {
    //         duration: 3000
    //       });
    //     }
    //   });
    // }
  }
}
