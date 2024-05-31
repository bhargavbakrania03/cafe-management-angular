import { Component, EventEmitter, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../core/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '../../../utils/constants';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent implements OnInit{
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: string = 'Add';
  responseMessage: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private fb: FormBuilder, private categoryService: CategoryService, private dialogRef: MatDialogRef<CategoryDialogComponent>, private snackbar: MatSnackBar){
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: [null,[Validators.required]] 
    })
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Update';
      this.categoryForm.patchValue(this.dialogData.data)
    }
  }

  @HostListener('window:keydown.Enter')
  handleSubmit(){
    if(this.dialogAction === 'Update'){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    const formData = this.categoryForm.value;
    const data = {
      category: formData.category,
    }
    this.categoryService.add(data).subscribe({next: (response: any)=>{
      this.dialogRef.close();
      this.onAddCategory.emit();
      this.responseMessage = response.message;
      this.snackbar.open(this.responseMessage, 'Close', {
        duration: 5000,
      })
    }, error: (error: HttpErrorResponse)=>{
      this.dialogRef.close();
      if(error.error.message){
        this.responseMessage = error.error.message;
      }
      else if(error.error.error){
        this.responseMessage = error.error.error;
      }
      else{
        this.responseMessage = CONSTANTS.ERROR.generic_error;
      }
      this.snackbar.open(this.responseMessage, 'Close', {
        duration: 5000,
      });
    }});
  }

  edit(){
    const formData = this.categoryForm.value;
    const data = {
      id: this.dialogData.data.id,
      category: formData.category,
    }
    this.categoryService.update(data).subscribe({next: (response: any)=>{
      this.dialogRef.close();
      this.onEditCategory.emit();
      this.responseMessage = response.message;
      this.snackbar.open(this.responseMessage, 'Close', {
        duration: 5000,
      })
    }, error: (error: HttpErrorResponse)=>{
      console.log(error)
      this.dialogRef.close();
      if(error.error.message){
        this.responseMessage = error.error.message;
      }
      else if(error.error.error){
        this.responseMessage = error.error.error;
      }
      else{
        this.responseMessage = CONSTANTS.ERROR.generic_error;
      }
      this.snackbar.open(this.responseMessage, 'Close', {
        duration: 5000,
      });
    }});
  }
}
