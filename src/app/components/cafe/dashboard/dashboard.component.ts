import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardService } from '../../../core/services/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItems } from '../../../shared/menu-items';
import { UserService } from '../../../core/services/user.service';

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
  @ViewChild('sidenav') sidenav: any;

  constructor(private dashboardService: DashboardService, private snackbar: MatSnackBar, public menuItems: MenuItems, private userService: UserService) {
    this.userService.isAuthenticated() && this.dashboardData();
    this.userService.toggleSidebar.subscribe(value => {
      this.sidenav.toggle();
    })
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe({
      next: (response) => {
        this.data = response;
        console.log(response)
      }, error: (error) => {
        if (error.error.message) {
          this.errorResponse = error.error.message;
        }
        else {
          this.errorResponse = 'Failed to fetch dashboard data !';
        }
        this.snackbar.open(this.errorResponse, 'Close', {
          duration: 5000,
        })
      }
    });
  }
}
