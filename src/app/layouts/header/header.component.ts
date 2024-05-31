import { Component, Injectable } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { CONSTANTS } from '../../utils/constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { ChangePasswordComponent } from '../../pages/cafe/change-password/change-password.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private userService: UserService, private dialog: MatDialog) {
    if (localStorage.getItem(CONSTANTS.AUTH_TOKEN)) {
      this.isLoggedIn = true;
    }

    this.userService.isLogged.subscribe(value => {
      this.isLoggedIn = value;
    })
  }

  userLogout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout'
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogRef.close();
      this.userService.logout();
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
