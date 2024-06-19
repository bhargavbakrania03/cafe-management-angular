import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDialogComponent } from '../../../layouts/dialog/product-dialog/product-dialog.component';
import { ConfirmationDialogComponent } from '../../../layouts/dialog/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import * as ProductActions from "../store/actions/product.actions";
import { CafeFeature } from "../store/cafe.reducer";
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Router } from '@angular/router';

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

  constructor(private productService: ProductService, private dialog: MatDialog, private snackbarService: SnackbarService, private store: Store, private router: Router
  ) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.store.select(CafeFeature.selectProducts).subscribe(value => {
      console.log('emmited')
      this.dataSource = new MatTableDataSource(value);
    })

    // this.productService.getProducts().subscribe({
    //   next: (response: any) => {
    //     this.dataSource = new MatTableDataSource(response);
    //     console.log(response)
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

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);

    this.router.events.subscribe(() => {
      dialogRef.close();
    })

    this.productService.onAddProduct.subscribe(value => {
      dialogRef.close();
      // this.tableData();
    })
    // dialogRef.componentInstance.onAddProduct.subscribe(
    //   (response) => {
    //     this.tableData();
    //   }
    // )
  }

  handleEditAction(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);

    this.router.events.subscribe(() => {
      dialogRef.close();
    })

    this.productService.onEditProduct.subscribe(value => {
      dialogRef.close();
      // this.tableData();
    })
    // dialogRef.componentInstance.onEditProduct.subscribe(
    //   (response) => {
    //     this.tableData();
    //   }
    // )
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

    this.router.events.subscribe(() => {
      dialogRef.close();
    })
  }

  deleteProduct(id: any) {

    this.store.dispatch(ProductActions.DeleteProduct({ id }));

    // this.productService.deleteProduct(id).subscribe({
    //   next: (response: any) => {
    //     this.tableData();
    //     this.responseMessage = response.message;
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

    //     this.snackbar.open(this.responseMessage, 'Close', {
    //       duration: 5000
    //     })
    //   }
    // })
  }

  onChange(id: number) {
    const data = {
      id: id,
    }

    this.store.dispatch(ProductActions.ChangeProductStatus(data));

    // this.productService.updateProduct(data).subscribe({
    //   next: (response: any) => {
    //     this.responseMessage = response.message;
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

    //     this.snackbar.open(this.responseMessage, 'Close', {
    //       duration: 5000
    //     })
    //   }
    // });
  }
}
