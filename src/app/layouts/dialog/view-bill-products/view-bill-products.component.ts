import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-bill-products',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './view-bill-products.component.html',
  styleUrl: './view-bill-products.component.scss'
})
export class ViewBillProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total'];
  dataSource: any;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<ViewBillProductsComponent>) { }

  ngOnInit(): void {
    this.data = this.dialogData.data;
    console.log(this.data)
    this.dataSource = new MatTableDataSource(this.dialogData.data.productDetails);
    console.log(this.dataSource);
  }
}
