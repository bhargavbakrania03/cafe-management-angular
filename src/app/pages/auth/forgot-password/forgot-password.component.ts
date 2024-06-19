import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material.module';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForgotPassword } from '../../../core/models/auth.model';
import { BlurDirective } from '../../../core/directives/blur.directive';
import { CONSTANTS } from '../../../utils/constants';
import { Store } from '@ngrx/store';
import { AuthFeature } from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, CommonModule, BlurDirective],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('forgotForm') form: any;
  forgotPasswordForm: any = FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private elRef: ElementRef, private store: Store) {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern(CONSTANTS.REGEX.email_regex)]),
    })
  }

  ngOnInit(): void {

  }

  submitForm() {
    if (this.forgotPasswordForm.valid) {
      this.store.dispatch(AuthActions.ForgotPasswordStart({ forgotPasswordData: <ForgotPassword>this.forgotPasswordForm.value }))

      this.store.select(AuthFeature.selectMessage).subscribe(response => {
        if (response !== '') {
          this.form.resetForm()
          setTimeout(() => {
            this.userService.navigate(CONSTANTS.ROUTES.login);
          }, 2000);
        }
      })
      this.store.select(AuthFeature.selectErrorMessage).subscribe(response => {
        if (response !== '') {
          this.elRef.nativeElement.querySelector('#email').focus();
        }
      })
      // this.userService.forgotPassword(<ForgotPassword>this.forgotPasswordForm.value).subscribe({
      //   next: (response: any) => {
      //     if (response) {
      //       this.snackbar.open('Please check your mail...', 'Close', {
      //         duration: 3000
      //       });


      //       setTimeout(() => {
      //       }, 3000);
      //     }
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     console.log(error);
      //     switch (error.status) {
      //       case 400:
      //         error.error.error && (this.errorMessage = error.error.error);
      //         break;
      //       case 500:
      //         this.errorMessage = "Some error occurred from server side !"
      //         break;
      //     }


      //     this.snackbar.open(this.errorMessage, 'Close', {
      //       duration: 3000
      //     });
      //   }
      // });
    }
  }
}
