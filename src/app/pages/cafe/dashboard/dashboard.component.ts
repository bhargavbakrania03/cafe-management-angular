import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';
import { MenuItems } from '../../../shared/menu-items';
import { UserService } from '../../../core/services/user.service';
import { Store } from '@ngrx/store';
import { CafeFeature } from '../store/cafe.reducer';
import * as DashboardActions from '../store/actions/dashboard.actions'
import { AuthFeature } from '../../auth/store/auth.reducer'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  data: any;
  errorResponse: any;

  constructor(public menuItems: MenuItems, private userService: UserService, private store: Store) {
    this.store.select(AuthFeature.selectIsAuthenticated) && this.dashboardData();
  }

  dashboardData() {
    this.store.dispatch(DashboardActions.GetDashboardData())

    this.store.select(CafeFeature.selectDashboardData).subscribe(value => {
      this.data = value;
    })

    // this.dashboardService.getDetails().subscribe({
    //   next: (response) => {
    //     console.log(response)
    //     this.data = response;
    //   }, error: (error) => {
    //     if (error.error.message) {
    //       this.errorResponse = error.error.message;
    //     }
    //     else {
    //       this.errorResponse = 'Failed to fetch dashboard data !';
    //     }
    //     this.snackbar.open(this.errorResponse, 'Close', {
    //       duration: 5000,
    //     })
    //   }
    // });
  }
}
