import { Component, EventEmitter, OnInit } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { CafeFeature } from '../store/cafe.reducer';
import * as BillActions from '../store/actions/bill.actions';
import { Subscription } from 'rxjs';

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
  downloadComplete = new EventEmitter<boolean>();
  receivedBill = new EventEmitter<boolean>();
  pdfSub!: Subscription;
  billSub!: Subscription;


  constructor(private billService: BillService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(BillActions.GetBillData());
    this.tableData();

    this.downloadComplete.subscribe(value => {
      if (value) {
        this.pdfSub.unsubscribe();
        this.downloadComplete.emit(false);
      }
    })

    this.receivedBill.subscribe(value => {
      if (value) {
        console.log('before unsubscribe');
        this.billSub.unsubscribe();
        console.log('after unsubscribe');
        this.receivedBill.emit(false);
      }
    })

  }

  tableData() {
    this.billSub = this.store.select(CafeFeature.selectBills).subscribe(bills => {
      if (bills.length !== 0) {
        console.log(bills)
        this.dataSource = new MatTableDataSource(bills);
        this.receivedBill.emit(true);
      }
    })
    // this.billService.getBills().subscribe({
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
      total: values.total,
      productDetails: values.productDetails,
    }

    this.store.dispatch(BillActions.GetPDF({ data }));

    this.pdfSub = this.store.select(CafeFeature.selectPdf).subscribe(pdf => {
      if (pdf !== null) {
        saveAs(pdf, values.uuid + '.pdf');
        this.downloadComplete.emit(true);
        // this.store.dispatch(BillActions.ClearPDF());
      }
    })

    // this.billService.getPDF(data).subscribe({
    //   next: (response: any) => {
    //     console.log(response)
    //     saveAs(response, values.uuid + '.pdf');
    //   }
    // })
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
    console.log(id)
    this.store.dispatch(BillActions.DeleteBill({ id }));
    this.tableData();
    // this.store.select(CafeFeature.selectBills).subscribe(bills => {
    //   this.dataSource = new MatTableDataSource(bills);
    // })
    // this.billService.delete(id).subscribe({
    //   next: (response: any) => {
    //     this.tableData();
    //     this.responseMessage = response?.message;
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
}
