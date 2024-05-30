import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource: any;
  responseMessage: string = '';

  constructor(private productService: ProductService, private dialog: MatDialog, private snackbar: MatSnackBar, private router: Router
  ) { }

  ngOnInit(): void {

  }
}
