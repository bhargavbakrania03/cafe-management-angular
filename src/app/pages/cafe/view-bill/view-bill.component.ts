import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BillService } from '../../../core/services/bill.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../../../utils/constants';
import { ViewBillProductsComponent } from '../../../layouts/dialog/view-bill-products/view-bill-products.component';
import { ConfirmationDialogComponent } from '../../../layouts/dialog/confirmation-dialog/confirmation-dialog.component';
import saveAs from 'file-saver';

@Component({
  selector: 'app-view-bill',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './view-bill.component.html',
  styleUrl: './view-bill.component.scss'
})
export class ViewBillComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource: any;
  responseMessage: string = '';

  constructor(private billService: BillService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.billService.getBills().subscribe({
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

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values,
    }
    dialogConfig.width = '100%';
    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
  }

  downloadReportAction(values: any) {
    let data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactNumber,
      paymentMethod: values.paymentMethod,
      totalAmount: values.total,
      productDetails: values.productDetails,
    }
    this.billService.getPDF(data).subscribe({
      next: (response: any) => {
        saveAs(response, values.uuid + '.pdf');
      }
    })
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Delete ' + values.name,
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (response) => {
        this.deleteProduct(values.id);
        dialogRef.close();
      }
    )
  }

  deleteProduct(id: any) {
    this.billService.delete(id).subscribe({
      next: (response: any) => {
        this.tableData();
        this.responseMessage = response?.message;
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
}
