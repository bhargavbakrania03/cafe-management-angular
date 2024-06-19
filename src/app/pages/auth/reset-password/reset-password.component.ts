import { Component, ElementRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlurDirective } from '../../../core/directives/blur.directive';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPassword } from '../../../core/models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthFeature } from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';

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

  constructor(private fb: FormBuilder, private userService: UserService, private currentRoute: ActivatedRoute, private elRef: ElementRef, private store: Store) {
  }

  resetPasswordForm = this.fb.group({
    new_password: new FormControl<string>('', [Validators.required])
  })

  submitForm() {
    if (this.resetPasswordForm.valid) {
      this.store.dispatch(AuthActions.ResetPasswordStart({ resetPasswordData: <ResetPassword>this.resetPasswordForm.value, resetToken: this.resetToken! }))

      this.store.select(AuthFeature.selectMessage).subscribe(response => {
        if (response !== null) {
          this.form.resetForm();
          this.userService.navigate('/login')
        }
      })

      this.store.select(AuthFeature.selectErrorMessage).subscribe(response => {
        console.log(response)
        if (response !== '') {
          this.elRef.nativeElement.querySelector(`#new_password`).focus();
        }
      })

      // this.userService.resetPassword(<ResetPassword>this.resetPasswordForm.value, this.resetToken!).subscribe({
      //   next: (response) => {
      //     console.log(response);
      //     if (response) {
      //       this.snackbar.open('Your Password has been changed successfully', 'Close', {
      //         duration: 3000
      //       });

      //       setTimeout(() => {
      //         this.router.navigate(['/login']);
      //       }, 3000);
      //     }
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     console.log(error);
      //     switch (error.status) {
      //       case 401:
      //         error.error.error && (this.errorMessage = error.error.error);
      //         break;
      //       case 500:
      //         this.errorMessage = "Some error occurred from server side !"
      //         break;
      //     }

      //     this.elRef.nativeElement.querySelector(`#new_password`).focus();

      //     this.snackbar.open(this.errorMessage, 'Close', {
      //       duration: 3000
      //     });
      //   }
      // })
      // this.form.resetForm();
    }
  }
}
