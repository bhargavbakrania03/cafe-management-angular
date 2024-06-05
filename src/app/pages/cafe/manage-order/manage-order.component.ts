import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../core/services/category.service';
import { BillService } from '../../../core/services/bill.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../../../utils/constants';
import { saveAs } from 'file-saver';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FlexLayoutModule],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss'
})
export class ManageOrderComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'quantity', 'price', 'total', 'action'];
  dataSource: any = [];
  responseMessage: string = '';

  manageOrderForm: any = FormGroup;
  categories: any = []
  products: any = []
  price: any;
  totalAmount: number = 0;

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService, private billService: BillService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this.manageOrderForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(CONSTANTS.REGEX.name_regex)]],
      email: [null, [Validators.required, Validators.email, Validators.pattern(CONSTANTS.REGEX.email_regex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(CONSTANTS.REGEX.contact_number_regex)]],
      paymentMethod: [null, [Validators.required]],
      category: [null, [Validators.required]],
      product: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      total: [null, [Validators.required]],
    })
  }

  getCategories() {
    this.categoryService.getCategory().subscribe({
      next: (response: any) => {
        this.categories = response;
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
        });
      }
    })
  }

  getProductsByCategory(value: any) {
    this.productService.getProductByCategory(value.category).subscribe({
      next: (response: any) => {
        this.products = response;
        console.log(response);
        this.manageOrderForm.controls['price'].setValue('');
        this.manageOrderForm.controls['quantity'].setValue('');
        this.manageOrderForm.controls['total'].setValue(0);
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
        });
      }
    })
  }

  getProductDetails(value: any) {
    this.productService.getProductById(value.id).subscribe({
      next: (response: any) => {
        this.price = response.price;
        this.manageOrderForm.controls['price'].setValue(response.price);
        this.manageOrderForm.controls['quantity'].setValue('1');
        this.manageOrderForm.controls['total'].setValue(this.price * 1);
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
        });
      }
    })
  }

  setQuantity(value: any) {
    let temp = this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
    else if (temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
  }

  validateProductAdd() {
    if (this.manageOrderForm.controls['total'].value === 0 || this.manageOrderForm.controls['total'].value === null || this.manageOrderForm.controls['quantity'].value === '') {
      return true;
    }
    else {
      return false;
    }
  }

  validateSubmit() {
    if (!(this.manageOrderForm.dirty && this.manageOrderForm.valid) || this.totalAmount === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  add() {
    let formData = this.manageOrderForm.value;
    let productName = this.dataSource.find((data: { id: number }) => data.id === formData.product.id);

    if (productName === undefined) {
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.category,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total
      });
      this.dataSource = [...this.dataSource];
      this.snackbar.open(CONSTANTS.MESSAGE.product_added, 'Done', {
        duration: 5000
      });
    }
    else {
      this.snackbar.open(CONSTANTS.ERROR.product_exists, 'Close', {
        duration: 5000,
      })
    }
  }

  handleDeleteAction(value: any, element: any) {
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    let formData = this.manageOrderForm.value;
    console.log(this.dataSource);
    let data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount,
      productDetails: JSON.stringify(this.dataSource)
    }
    this.billService.generateReport(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.downloadFile(response);
        this.manageOrderForm.reset();
        this.dataSource = [];
        this.totalAmount = 0;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
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
    })
  }

  downloadFile(data: any) {
    // this.billService.getPDF(data).subscribe({
    //   next: (response: any) => {
    //     saveAs(response, filename + '.pdf');
    //   }
    // });
    let downloadURL = window.URL.createObjectURL(data);
    saveAs(downloadURL);
  }
}
