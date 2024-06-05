import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTS } from '../../../utils/constants';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';

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

  constructor(private userService: UserService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response.users);
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.message) {
          this.responseMessage = error.error.message;
        }
        else if (error.error.error) {
          this.responseMessage = error.error.error;
        }
        else {
          this.responseMessage = CONSTANTS.ERROR.generic_error;
        }
        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000,
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleChangeAction(status: any, id: any) {
    const data = {
      status: status.checked.toString(),
      id
    }
    this.userService.updateUser(data).subscribe({
      next: (response: any) => {
        // console.log(response)
        this.responseMessage = response?.message;
        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000,
        })
      }, error: (error: HttpErrorResponse) => {
        status.source.checked = !status.source.checked;
        // console.log(status)
        if (error.error.message) {
          this.responseMessage = error.error.message;
        }
        else if (error.error.error) {
          this.responseMessage = error.error.error;
        }
        else {
          this.responseMessage = CONSTANTS.ERROR.generic_error;
        }
        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000,
        });
      }
    });
  }
}
