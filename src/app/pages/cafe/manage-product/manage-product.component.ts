import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../../../utils/constants';
import { ProductDialogComponent } from '../../../layouts/dialog/product-dialog/product-dialog.component';
import { ConfirmationDialogComponent } from '../../../layouts/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = ['product', 'categoryName', 'description', 'price', 'action'];
  dataSource: any;
  responseMessage: string = '';

  constructor(private productService: ProductService, private dialog: MatDialog, private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response);
        console.log(response)
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

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);
    dialogRef.componentInstance.onAddProduct.subscribe(
      (response) => {
        this.tableData();
      }
    )
  }

  handleEditAction(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);
    dialogRef.componentInstance.onEditProduct.subscribe(
      (response) => {
        this.tableData();
      }
    )
  }

  handleDeleteAction(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Delete ' + data.name,
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (response) => {
        this.deleteProduct(data.id);
        dialogRef.close();
      }
    )
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: (response: any) => {
        this.tableData();
        this.responseMessage = response.message;
        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000
        })
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.error) {
          this.responseMessage = error.error.error;
        }
        else {
          this.responseMessage = CONSTANTS.ERROR.generic_error;
        }

        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000
        })
      }
    })
  }

  onChange(status: any, id: any) {
    const data = {
      status: status.toString(),
      id: id
    }
    this.productService.updateProduct(data).subscribe({
      next: (response: any) => {
        this.responseMessage = response.message;
        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000
        })
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.error) {
          this.responseMessage = error.error.error;
        }
        else {
          this.responseMessage = CONSTANTS.ERROR.generic_error;
        }

        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000
        })
      }
    });
  }
}
