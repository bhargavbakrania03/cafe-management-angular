import { Component, OnInit } from '@angular/core';
import { MaterialModule } from './shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthFeature } from './pages/auth/store/auth.reducer';
import { CONSTANTS } from './utils/constants';
import * as CategoryActions from '../app/pages/cafe/store/actions/category.actions'
import * as ProductActions from '../app/pages/cafe/store/actions/product.actions'
import { CafeFeature } from './pages/cafe/store/cafe.reducer';
import { SnackbarService } from './core/services/snackbar.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private snackbarService: SnackbarService, private userService: UserService) { }

  ngOnInit(): void {
    this.store.select(AuthFeature.selectIsAuthenticated).subscribe(value => {
      if (value) {
        this.store.dispatch(CategoryActions.GetCategory())
        this.store.dispatch(ProductActions.GetProducts())
      }
    })

    if (this.userService.getLoginToken()) {
      this.store.dispatch(CategoryActions.GetCategory())
      this.store.dispatch(ProductActions.GetProducts())
    }

    this.store.select(CafeFeature.selectError).subscribe(error => {
      if (error !== '') {
        this.snackbarService.openSnackbar(error);
      }
    })
  }
}
