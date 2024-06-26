import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user.service';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthFeature } from '../../../pages/auth/store/auth.reducer';
import * as AuthActions from '../../../pages/auth/store/auth.actions';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any;
  // responseMessage: string = '';

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, public dialogRef: MatDialogRef<ChangePasswordComponent>, private userService: UserService, private elRef: ElementRef, private store: Store) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      old_password: [null, [Validators.required]],
      new_password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]]
    })
  }

  validateSubmit() {
    if (this.changePasswordForm.controls.new_password.value != this.changePasswordForm.controls.confirm_password.value) {
      return true;
    }
    else {
      return false;
    }
  }

  @HostListener('window:keydown.Enter')
  handleSubmit() {
    if (this.changePasswordForm.dirty && this.changePasswordForm.valid) {
      const values = this.changePasswordForm.value;
      const data = {
        old_password: values.old_password,
        new_password: values.new_password
      }

      this.store.dispatch(AuthActions.ChangePasswordStart({ changePasswordData: data }));

      // this.store.select(AuthFeature.selectErrorMessage).subscribe(error => {
      //   if (error !== '') {
      //     if (error.toLowerCase().includes('old password')) {
      //       this.elRef.nativeElement.querySelector(`#old_password`).focus();
      //     }
      //   }
      // })

      this.store.select(AuthFeature.selectMessage).subscribe(message => {
        if (message !== '') {
          this.dialogRef.close();
        }
      })

      // this.userService.changePassword(data).subscribe({
      //   next: (response: any) => {
      //     this.responseMessage = response.message;
      //     this.dialogRef.close();
      //     this.snackbar.open(this.responseMessage, 'Close', {
      //       duration: 5000
      //     })
      //   },
      //   error: (error: HttpErrorResponse) => {
      //     if (error.error.error) {
      //       this.responseMessage = error.error.error;
      //     }
      //     else {
      //       this.responseMessage = CONSTANTS.ERROR.generic_error;
      //     }

      //     if (this.responseMessage.toLowerCase().includes('old password')) {
      //       this.elRef.nativeElement.querySelector(`#old_password`).focus();
      //     }

      //     this.snackbar.open(this.responseMessage, 'Close', {
      //       duration: 5000
      //     })
      //   }
      // });
    }
  }
}
