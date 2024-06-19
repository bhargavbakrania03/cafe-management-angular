import { Component, EventEmitter, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../core/services/category.service';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { SnackbarService } from '../../../core/services/snackbar.service';
import * as CategoryActions from '../../../pages/cafe/store/actions/category.actions';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: string = 'Add';
  responseMessage: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private fb: FormBuilder, private categoryService: CategoryService, private dialogRef: MatDialogRef<CategoryDialogComponent>, private store: Store, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: [null, [Validators.required]]
    })
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Update';
      this.categoryForm.patchValue(this.dialogData.data)
    }
  }

  @HostListener('window:keydown.Enter')
  handleSubmit() {
    if (this.categoryForm.dirty && this.categoryForm.valid) {
      if (this.dialogAction === 'Update') {
        this.edit();
      }
      else {
        this.add();
      }
    }
  }

  add() {
    const formData = this.categoryForm.value;
    const data: { category: string } = {
      category: formData.category,
    }

    this.store.dispatch(CategoryActions.AddCategory({ category: data.category }))

    // this.store.select(CafeFeature.selectError).subscribe(error => {
    //   if (error !== '') {
    //     this.snackbarService.openSnackbar(error)
    //   }
    // })

    this.categoryService.onAddCategory.subscribe(value => {
      this.dialogRef.close();
    })

    // this.categoryService.add(data).subscribe({
    //   next: (response: any) => {
    //     this.dialogRef.close();
    //     this.onAddCategory.emit();
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
    const formData = this.categoryForm.value;
    const data = {
      id: this.dialogData.data.id,
      category: formData.category,
    }

    this.store.dispatch(CategoryActions.UpdateCategory({ category: data }))

    // this.store.select(CafeFeature.selectError).subscribe(error => {
    //   if (error !== '') {
    //     this.snackbarService.openSnackbar(error)
    //   }
    // })

    this.categoryService.onEditCategory.subscribe(value => {
      this.dialogRef.close();
    })

    // this.categoryService.update(data).subscribe({
    //   next: (response: any) => {
    //     this.dialogRef.close();
    //     this.onEditCategory.emit();
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
