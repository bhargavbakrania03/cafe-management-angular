import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTS } from '../../../utils/constants';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/actions/user.actions';
import { CafeFeature } from '../store/cafe.reducer';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'status'];
  dataSource: any = [];
  responseMessage: string = '';

  constructor(private userService: UserService, private snackbar: MatSnackBar, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(UserActions.GetUsers());
    this.tableData();
  }

  tableData() {
    this.store.select(CafeFeature.selectUsers).subscribe(user => {
      this.dataSource = new MatTableDataSource(user);
    })

    // this.userService.getUsers().subscribe({
    //   next: (response: any) => {
    //     this.dataSource = new MatTableDataSource(response.users);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     if (error.error.message) {
    //       this.responseMessage = error.error.message;
    //     }
    //     else if (error.error.error) {
    //       this.responseMessage = error.error.error;
    //     }
    //     else {
    //       this.responseMessage = CONSTANTS.ERROR.generic_error;
    //     }
    //     this.snackbar.open(this.responseMessage, 'Close', {
    //       duration: 5000,
    //     })
    //   }
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleChangeAction(status: any, id: any) {
    this.store.dispatch(UserActions.UpdateUser({ id }));

    // this.userService.updateUser(id).subscribe({
    //   next: (response: any) => {
    //     // console.log(response)
    //     this.responseMessage = response?.message;
    //     this.snackbar.open(this.responseMessage, 'Close', {
    //       duration: 5000,
    //     })
    //   }, error: (error: HttpErrorResponse) => {
    //     status.source.checked = !status.source.checked;
    //     // console.log(status)
    //     if (error.error.message) {
    //       this.responseMessage = error.error.message;
    //     }
    //     else if (error.error.error) {
    //       this.responseMessage = error.error.error;
    //     }
    //     else {
    //       this.responseMessage = CONSTANTS.ERROR.generic_error;
    //     }
    //     this.snackbar.open(this.responseMessage, 'Close', {
    //       duration: 5000,
    //     });
    //   }
    // });
  }
}
