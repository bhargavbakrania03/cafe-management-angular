import { Component, Injectable } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { CONSTANTS } from '../../utils/constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { ChangePasswordComponent } from '../dialog/change-password/change-password.component';
import { Store } from '@ngrx/store';
import { AuthFeature } from '../../pages/auth/store/auth.reducer';
import * as AuthActions from '../../pages/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private userService: UserService, private dialog: MatDialog, private store: Store) {
    this.store.select(AuthFeature.selectIsAuthenticated).subscribe(value => {
      this.isLoggedIn = value;
    })

    if (userService.getLoginToken()) {
      this.isLoggedIn = true;
    }

    // this.userService.isLogged.subscribe(value => {
    //   this.isLoggedIn = value;
    // })
  }

  userLogout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout'
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogRef.close();
      this.store.dispatch(AuthActions.Logout())
      // this.userService.logout();
    })
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

  toggleSidebar() {
    this.userService.toggleSidebar.next(true);
  }
}
