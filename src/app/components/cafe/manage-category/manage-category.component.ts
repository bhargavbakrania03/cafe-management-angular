import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatTableDataSource } from '@angular/material/table'
import { CONSTANTS } from '../../../utils/constants';
import { CategoryDialogComponent } from '../../../layouts/dialog/category-dialog/category-dialog.component';


@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: string = '';

  constructor(private categoryService: CategoryService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.categoryService.getCategory().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
      },
      error: (error: any) => {
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

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
    dialogRef.componentInstance.onAddCategory.subscribe(
      (response) => {
        this.tableData();
      }
    )
  }

  handleEditAction(data: any) {
    console.log(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
    dialogRef.componentInstance.onEditCategory.subscribe(
      (response) => {
        this.tableData();
      }
    )
  }
}
