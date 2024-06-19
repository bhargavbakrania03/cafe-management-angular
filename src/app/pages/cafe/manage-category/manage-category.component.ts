import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatTableDataSource } from '@angular/material/table'
import { CategoryDialogComponent } from '../../../layouts/dialog/category-dialog/category-dialog.component';
import { Store } from '@ngrx/store';
import { CafeFeature } from '../store/cafe.reducer';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['category', 'action'];
  dataSource: any;
  responseMessage: string = '';

  constructor(private dialog: MatDialog, private store: Store, private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.store.select(CafeFeature.selectCategory).subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
    })

    // this.categoryService.getCategory().subscribe({
    //   next: (response: any) => {
    //     console.log(response)
    //     this.dataSource = new MatTableDataSource(response);
    //   },
    //   error: (error: any) => {
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

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);

    this.router.events.subscribe(() => {
      dialogRef.close();
    })
    // dialogRef.componentInstance.onAddCategory.subscribe(
    //   (response) => {
    //     this.tableData();
    //   }
    // )
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

    this.router.events.subscribe(() => {
      dialogRef.close();
    })
    // dialogRef.componentInstance.onEditCategory.subscribe(
    //   (response) => {
    //     this.tableData();
    //   }
    // )
  }
}
