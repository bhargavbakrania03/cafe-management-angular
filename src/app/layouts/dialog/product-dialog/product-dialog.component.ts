import { Component, EventEmitter, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../../../utils/constants';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: string = 'Add';
  responseMessage: string = '';
  categories: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService, private dialogRef: MatDialogRef<ProductDialogComponent>, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Update';
      this.productForm.patchValue(this.dialogData.data)
    }

    this.getCategories();
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

  @HostListener('window:keydown.Enter')
  handleSubmit() {
    if (this.dialogAction === 'Update') {
      this.edit();
    }
    else {
      this.add();
    }
  }

  add() {
    const formData = this.productForm.value;
    const data = {
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
      status: true,
    }
    console.log(data);
    this.productService.addProduct(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
        this.responseMessage = response.message;
        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000,
        })
      }, error: (error: HttpErrorResponse) => {
        this.dialogRef.close();
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

  edit() {
    const formData = this.productForm.value;
    const data = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
    }
    this.productService.updateProduct(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.message;
        this.snackbar.open(this.responseMessage, 'Close', {
          duration: 5000,
        })
      }, error: (error: HttpErrorResponse) => {
        console.log(error)
        this.dialogRef.close();
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
