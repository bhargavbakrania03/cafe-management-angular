import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import * as ProductActions from '../../../pages/cafe/store/actions/product.actions'
import { Store } from '@ngrx/store';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { CafeFeature } from '../../../pages/cafe/store/cafe.reducer';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent implements OnInit {
  productForm: any = FormGroup;
  dialogAction: string = 'Add';
  responseMessage: string = '';
  categories: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService, private dialogRef: MatDialogRef<ProductDialogComponent>, private store: Store, private snackbarService: SnackbarService) { }

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
      console.log(this.dialogData.data)
    }

    this.getCategories();
  }

  getCategories() {
    this.store.select(CafeFeature.selectCategory).subscribe(value => {
      this.categories = value;
    })

    // this.store.select(CafeFeature.selectError).subscribe(error => {
    //   if (error) {
    //     this.snackbarService.openSnackbar(error);
    //   }
    // })

    // this.categoryService.getCategory().subscribe({
    //   next: (response: any) => {
    //     this.categories = response;
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
    //     });
    //   }
    // })
  }

  @HostListener('window:keydown.Enter')
  handleSubmit() {
    if (this.productForm.dirty && this.productForm.valid) {
      if (this.dialogAction === 'Update') {
        this.edit();
      }
      else {
        this.add();
      }
    }
  }

  add() {
    const formData = this.productForm.value;
    const data = {
      id: null,
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
      status: true,
    }
    console.log(data);

    this.store.dispatch(ProductActions.AddProduct({ product: data }));

    // this.store.select(CafeFeature.selectError).subscribe(error => {
    //   if (error) {
    //     this.snackbarService.openSnackbar(error);
    //   }
    // })

    // this.productService.addProduct(data).subscribe({
    //   next: (response: any) => {
    //     console.log(response)
    //     this.dialogRef.close();
    //     this.onAddProduct.emit();
    //     this.responseMessage = response.message;
    //     this.snackbar.open(this.responseMessage, 'Close', {
    //       duration: 5000,
    //     })
    //   }, error: (error: HttpErrorResponse) => {
    //     this.dialogRef.close();
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

  edit() {
    const formData = this.productForm.value;
    const data = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
    }

    this.store.dispatch(ProductActions.UpdateProduct({ product: data }));

    // this.store.select(CafeFeature.selectError).subscribe(error => {
    //   if (error) {
    //     this.snackbarService.openSnackbar(error);
    //   }
    // })

    // this.productService.updateProduct(data).subscribe({
    //   next: (response: any) => {
    //     this.dialogRef.close();
    //     this.onEditProduct.emit();
    //     this.responseMessage = response.message;
    //     this.snackbar.open(this.responseMessage, 'Close', {
    //       duration: 5000,
    //     })
    //   }, error: (error: HttpErrorResponse) => {
    //     console.log(error)
    //     this.dialogRef.close();
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
